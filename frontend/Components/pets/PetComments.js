import React, {createRef, useEffect, useState} from "react"
import {Form, FormItem} from "react-native-form-component"
import {ScrollView} from "react-native-gesture-handler"

import {style} from "../../../styles/Commons"
import {form} from "../../../styles/Form"
import {colors} from "../../../styles/Colors"

import {createPet, getAllUser, getDir} from "../../../server/Api.js"
import {handleImagePicked, pickImage} from "../../../server/FirebaseServer"
import Loader from "../../drawerlayout/Loader"
import Back from "../../drawerlayout/Back"
import {
    CalendarForm,
    ImageForm,
    MultiLineLabel,
    SimpleCheckBox,
    SimpleLineLabel,
    SimpleLinePicker
} from "../../drawerlayout/FormItemGeneric"
import {petCreationScreenStyle} from "../../../styles/pet/PetCreationScreenStyle"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MapView, {Circle, Marker} from "react-native-maps";

import * as Location from 'expo-location';
import {View} from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import geodist from "geodist"
import {getUserByEmail} from "../../server/Api";


export default function PetCreation({navigation, pet}) {
    const [image, setImage] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [age, setAge] = useState(null)
    const [ageDate, setAgeDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
    const [region, setRegion] = useState({latitude: -36.6769415180527, longitude: 	-60.5588319815719})
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState([])
    const nameInputRef = createRef()

    useEffect(() => {
        getCurrentPosition()
    }, []);


    const pickAnImage = async () => {
        const pickerResult = await pickImage()
        setImage(pickerResult)
        setImageUri(pickerResult.uri)
    }

    const uploadedImage = async () => {
        if (!image) {
            return ""
        }
        return await handleImagePicked(image)
    }

    const publish = async () => {

        setLoading(true)
        const userEmail = await AsyncStorage.getItem("user_id")

        const imageUpload = await uploadedImage()
        const comment = {
            "petID": pet.id,
            "image": imageUpload,
            "dateOfSeen": dateOfSeen,
            "commentary": commentary,
            "contact": userEmail,
            "coordinates": region
        }

        try {
            await createComment(comment)
            sendPushNotification(pet)
            navigation.navigate("Inicio")
        } catch (error) {
            setErrors(error.errors)
        }
        setLoading(false)
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (date) => {
        setAge(getAge(date))
        setAgeDate(date)
        hideDatePicker()
    }

    const getAge = (dateInput) => {
        const dateArray = dateInput.toLocaleDateString().split("/")
        return ([dateArray[1], dateArray[0], dateInput.getFullYear()].join("/"))
    }
    const mapDir = (index, dire) => {
        return { id: index, name: dire.nomenclatura}
    }

    const onSelected = async (item) => {
        let reg = await Location.geocodeAsync(item.name)
        setLocation(item)
        setRegion({ latitude: reg[0].latitude, longitude: reg[0].longitude })
    }
    const onChangeText = async(dir) => {
        try {
            let algo = await getDir(dir)
            setLocation([])
            setLocations(algo.data["direcciones"].map((dire, index) => mapDir(index, dire)))
        } catch (e) {
            console.log(e)
        }
    }
    const getCurrentPosition = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let reg = await Location.getCurrentPositionAsync({});
        await onChangeRegion(reg["coords"])
        setRegion({ latitude: reg["coords"].latitude, longitude: reg["coords"].longitude })
    }
    const onChangeRegion = async (newRegion) => {
        setRegion(newRegion)
        let reg = await Location.reverseGeocodeAsync(newRegion)
        setLocation({id:1, name:`${reg[0].street}, ${reg[0].streetNumber}, ${reg[0].city}`})
    }
    return (
        <View>
            <ScrollView style={style.fullContainer}>
                <Loader loading={loading}/>
                <Back onPress={() => navigation.goBack()} text="Cargar una mascota"
                      headerStyle={petCreationScreenStyle.header}/>
                <ImageForm
                    imageUri={imageUri}
                    onPress={pickAnImage}
                />

                <Form
                    GenericInput={"Cargar un comentario"} onButtonPress={() => publish()}
                    buttonStyle={{backgroundColor: colors.violet}}
                    buttonText="Publicar"
                    style={[style.marginX, style.bgWhite]}>
                    <CalendarForm
                        isVisible={isDatePickerVisible}
                        date={ageDate}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        dateText={dateOfSeen}
                        defaultText="Fecha aproximada que se lo vio"
                        onPress={showDatePicker}

                    />

                    <MultiLineLabel
                        value={description}
                        label={"Cuentanos un poco sobre el encuentro"}
                        onChangeText={setDescription}
                    />
                </Form>
            </ScrollView>
                <View>
                    <SearchableDropdown
                        multi={true}
                        selectedItems={[location]}
                        onTextChange= {(text) => onChangeText(text)}
                        onItemSelect={(item) => {
                            onSelected(item)
                        }}
                        onRemoveItem={() => setLocation([])}
                        containerStyle={{ padding: 5 }}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#ddd',
                            borderColor: '#bbb',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={locations}
                        defaultIndex={2}
                        resetValue={true}
                        textInputProps={
                            {
                                placeholder: "Direccion",
                                underlineColorAndroid: "transparent",
                                style: {
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                }
                            }
                        }

                    />

                    <MapView
                        style={{width: "100%", height: 200}}
                        initialRegion={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        region={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        onPress={(e) => onChangeRegion(e.nativeEvent.coordinate)}
                    >
                        <Marker
                            coordinate={region}
                            onDrag={(e) => setRegion(e.nativeEvent.coordinate)}
                        />
                        <Circle center={region} radius={1000}/>
                    </MapView>
                </View>
            }</View>
    )
}

async function sendPushNotification(pet) {
    const user = await getUserByEmail(pet.user)
    const tokens = user.data.expoPushToken
    const message = {
        to: tokens,
        title: 'Nuevo comentario sobre' + pet.name,
        body: pet.description,
        data: { id: pet.id },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}




