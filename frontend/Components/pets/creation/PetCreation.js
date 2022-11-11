import React, {createRef, useState, useEffect} from "react"
import {Form, FormItem} from "react-native-form-component"
import {ScrollView} from "react-native-gesture-handler"

import {style} from "../../../styles/Commons"
import {form} from "../../../styles/Form"
import {colors} from "../../../styles/Colors"

import {createPet, getAllUser} from "../../../server/Api.js"
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
import MapView, {Callout, Circle, Marker} from "react-native-maps";

import * as Location from 'expo-location';


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
    const [region, setRegion] = useState({})
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
<<<<<<< HEAD
=======
    const [region, setRegion] = useState({latitude: -36.6769415180527, longitude: 	-60.5588319815719})
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState([])
>>>>>>> 6a07166bed7140c7d9186d721ede6fe138a959f9
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
        const uuid = await handleImagePicked(image)
        return uuid
    }

    const publish = async () => {
        setLoading(true)

        const userEmail = await AsyncStorage.getItem("user_id")
        const imageUpload = await uploadedImage()

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
            await createPet(pet)
            if (pet.state === 'Perdido') {
                sendPushNotification()
            }
            navigation.navigate("Inicio")

        } catch (error) {
            setErrors(error.errors)
            console.log("holaaa")
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

    const getCurrentPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setRegion({ latitude: -34.706753, longitude: -58.277948  })
            return;
          }

<<<<<<< HEAD
          let location = await Location.getCurrentPositionAsync({});
          setRegion({ latitude: location["coords"].latitude, longitude: location["coords"].longitude })
=======
          let reg = await Location.getCurrentPositionAsync({});
          await onChangeRegion(reg["coords"])
          setRegion({ latitude: reg["coords"].latitude, longitude: reg["coords"].longitude })
    }
    const onChangeRegion = async (newRegion) => {
        setRegion(newRegion)
        let reg = await Location.reverseGeocodeAsync(newRegion)
        setLocation({id:1, name:`${reg[0].street}, ${reg[0].streetNumber}, ${reg[0].city}`})
>>>>>>> 6a07166bed7140c7d9186d721ede6fe138a959f9
    }
    return (
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
                {/* <RequiredLineLabel
                    value = {name}
                    label = "Nombre"
                    onChangeText = {setName}
                    ref = {nameInputRef}
                    inputRef={nameInputRef.current && nameInputRef.current.focus()}
                /> */}

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
                {state === "Perdido" &&
                    <MapView
                        style={{width: "100%", height: 200}}
                        initialRegion={{
                            latitude: region.latitude,
                            longitude: region.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        onPress={(e) => setRegion(e.nativeEvent.coordinate)}
                        showsUserLocation={true}
                        
                    >
                        <Marker 
                                coordinate={region}
                                onDrag={(e) => setRegion(e.nativeEvent.coordinate)}
                        />
                        <Circle center={region} radius={1000}/>
                    </MapView>
                }
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
<<<<<<< HEAD
=======
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
>>>>>>> 6a07166bed7140c7d9186d721ede6fe138a959f9
    )
}

async function sendPushNotification() {
    const allUsers = await getAllUser()
    const tokens = allUsers.data.map((user) => user.expoPushToken)
    const message = {
        to: tokens,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
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




