import React, {createRef, useEffect, useState} from "react"
import {Form, FormItem} from "react-native-form-component"
import {style} from "../../../styles/Commons"
import {form} from "../../../styles/Form"
import {colors} from "../../../styles/Colors"

import {createPet, getDir} from "../../../server/Api.js"
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
import * as Location from 'expo-location'
import {SafeAreaView, ScrollView} from "react-native"
import {sendLostPet} from "../../Notifications";
import MapViewWithLabel from "../../map/MapViewWithLabel";
import {getDate, mapDir} from "../../drawerlayout/CommonFunctions";

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
    const [region, setRegion] = useState({latitude: -36.6769415180527, longitude: -60.5588319815719})
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState({})
    const [changeText, setChangeText] = useState('')
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
        let imageUpload = ''
        try {
            imageUpload = await uploadedImage()
        } catch (e) {
            console.log(e)
        }
        const pet = {
            "name": name,
            "image": imageUpload,
            "birth": age,
            "state": state,
            "type": type,
            "breed": breed,
            "vaccine": vaccine,
            "castrated": castrated,
            "medicalHistory": medicalHistory,
            "description": description,
            "tutor": userEmail,
            "coordinates": state === 'Perdido' ? region : null
        }

        try {
            const petDB = await createPet(pet)
            if (pet.state === 'Perdido') {
                await sendLostPet(petDB.data)
            }
            navigation.navigate("Inicio", "Creacion")
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
        setAge(getDate(date))
        setAgeDate(date)
        hideDatePicker()
    }


    const onSelected = async (item) => {
        setClose(true)
        let reg = await Location.geocodeAsync(item.name)
        setLocation(item)
        setRegion({latitude: reg[0].latitude, longitude: reg[0].longitude})
    }
    const onChangeText = async (dir) => {
        setClose(false)
        try {
            let direction = await getDir(dir)
            setChangeText(dir)
            setLocations(direction.data["direcciones"].map((dire, index) => mapDir(index, dire)))
        } catch (e) {
            setChangeText('')
            console.log(e)
        }
    }
    const getCurrentPosition = async () => {

        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let reg = await Location.getCurrentPositionAsync({});
        await onChangeRegion(reg["coords"])
        setRegion({latitude: reg["coords"].latitude, longitude: reg["coords"].longitude})
    }
    const onChangeRegion = async (newRegion) => {
        setRegion(newRegion)
        let reg = await Location.reverseGeocodeAsync(newRegion)
        setLocation({id: 1, name: `${reg[0].street}, ${reg[0].streetNumber}, ${reg[0].city}`})
    }

    const renderGoBack = () => {
        return (
            <React.Fragment>
                <Loader loading={loading}/>
                <Back onPress={() => navigation.goBack()} text="Publicar una mascota"
                      headerStyle={petCreationScreenStyle.header}/>
            </React.Fragment>
        )
    }
    const [close, setClose] = useState(false)
    return (
        <SafeAreaView style={{flex: 1}}>
            {renderGoBack()}
            <ScrollView>
                <Form GenericInput={"Publicar una mascota"} onButtonPress={() => publish()}
                      buttonStyle={{backgroundColor: colors.violet}} buttonText="Publicar"
                      style={[style.marginX, style.bgWhite]}>
                    <ImageForm
                        imageUri={imageUri}
                        onPress={pickAnImage}
                    />

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
                    <MapViewWithLabel region={region} onSelected={(item) => onSelected(item)}
                                      location={location}
                                      locations={locations}
                                      close={close}
                                      changeText={changeText}
                                      onPressMap={(e) => onChangeRegion(e.nativeEvent.coordinate)}
                                      onDragMarker={(e) => setRegion(e.nativeEvent.coordinate)}
                                      onChangeText={(text) => onChangeText(text)}/>
                </Form>
            </ScrollView>
        </SafeAreaView>
    )
}
