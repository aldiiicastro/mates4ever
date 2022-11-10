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


export default function PetCreation({navigation}) {
    const [image, setImage] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [name, setName] = useState('')
    const [age, setAge] = useState(null)
    const [ageDate, setAgeDate] = useState(new Date())
    const [state, setState] = useState("Adopción")
    const [type, setType] = useState("Perro")
    const [breed, setBreed] = useState('')
    const [vaccine, setVaccine] = useState(false)
    const [castrated, setCastrated] = useState(false)
    const [medicalHistory, setMedicalHistory] = useState('')
    const [description, setDescription] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
    const [region, setRegion] = useState({})
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

        const image = await uploadedImage()
        const pet = {
            "name": name,
            "image": image,
            "birth": age,
            "state": state,
            "type": type,
            "breed": breed,
            "castrated": castrated,
            "vaccine": vaccine,
            "medicalHistory": medicalHistory,
            "description": description,
            "tutor": userEmail,
            "coordinates": region
        }

        try {
            const petDB = await createPet(pet)

            if (pet.state === 'Perdido') {
                sendPushNotification(petDB.data)
            }
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
                GenericInput={"Cargar una mascota"} onButtonPress={() => publish()}
                buttonStyle={{backgroundColor: colors.violet}}
                buttonText="Publicar"
                style={[style.marginX, style.bgWhite]}>

                <FormItem
                    value={name}
                    label={"Nombre"}
                    onChangeText={setName}
                    showErrorIcon={false}
                    asterik
                    floatingLabel
                    isRequired
                    textInputStyle={form.inputLineBox}
                    onSubmitEditing={() => nameInputRef.current && nameInputRef.current.focus()}
                    ref={nameInputRef}
                    errorBorderColor="white"
                />
                <CalendarForm
                    isVisible={isDatePickerVisible}
                    date={ageDate}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    dateText={age}
                    defaultText="Fecha aproximada de nacimiento"
                    onPress={showDatePicker}

                />

                <SimpleLinePicker
                    items={[
                        {label: "Adopción", value: "Adopción"},
                        {label: "Transito", value: "Transito"},
                        {label: "Perdido", value: "Perdido"},
                    ]}
                    label="Tipo de publicacion"
                    selectedValue={state}
                    onSelection={(item) => setState(item.value)}
                />

                <SimpleLinePicker
                    items={[
                        {label: "Perro", value: "Perro"},
                        {label: "Gato", value: "Gato"},
                        {label: "Otro", value: "Otro"},
                    ]}
                    label="Tipo de animal"
                    selectedValue={type}
                    onSelection={(item) => setType(item.value)}
                />

                <SimpleLineLabel
                    value={breed}
                    label={"Tiene raza? Cual?"}
                    onChangeText={setBreed}
                />

                <MultiLineLabel
                    value={description}
                    label={"Cuentanos un poco sobre " + (name ? name : "el/ella")}
                    onChangeText={setDescription}
                />

                <MultiLineLabel
                    value={medicalHistory}
                    label={"Tiene algun problema medico? Algo que quieras destacar?"}
                    onChangeText={setMedicalHistory}
                />

                <SimpleCheckBox
                    status={vaccine ? "checked" : "unchecked"}
                    onPress={() => {
                        setVaccine(!vaccine)
                    }}
                    text={"¿Tiene las vacunas al día?"}
                />

                <SimpleCheckBox
                    status={castrated ? "checked" : "unchecked"}
                    onPress={() => {
                        setCastrated(!castrated)
                    }}
                    text={"¿Esta castrado?"}
                />
            </Form>
        </ScrollView>
    {state === "Perdido" &&
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
const calculateDist = (userCoordinates, petCoordinates) => {
    const dist = geodist({lat: petCoordinates.latitude, lon: petCoordinates.longitude}, {lat:userCoordinates.latitude, lon: userCoordinates.longitude}, {exact: true, unit: 'km'})
    return dist < 1
}
async function sendPushNotification(pet) {
    const allUsers = await getAllUser()
    const users = allUsers.data.filter((user) => calculateDist(user.coordinates, pet.coordinates))
    const tokens = users.map((user) => user.expoPushToken)
    const message = {
        to: tokens,
        title: 'Se perdio ' + pet.name,
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




