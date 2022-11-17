import React, {useEffect, useState} from "react"
import {Form} from "react-native-form-component"
import {ScrollView} from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from 'expo-location'
import {createComment, getDir, getUserByEmail} from "../../server/Api"
import {handleImagePicked, pickImage} from "../../server/FirebaseServer"
import Loader from "../drawerlayout/Loader"
import {CalendarForm, ImageForm, MultiLineLabel, SimpleCheckBox} from "../drawerlayout/FormItemGeneric"
import {colors} from "../../styles/Colors"
import {petCreationScreenStyle} from "../../styles/pet/PetCreationScreenStyle"
import {style} from "../../styles/Commons"
import Back from "../drawerlayout/Back"
import {Alert} from "react-native"

export default function CommentScreen({navigation, route}) {
    const [image, setImage] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [dateOfSeen, setDateOfSeen] = useState(null)
    const [ageDate, setAgeDate] = useState(new Date())
    const [commentary, setCommentary] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
    const [region, setRegion] = useState({latitude: -36.6769415180527, longitude: -60.5588319815719})
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState({})
    const [wantLocation, setWantLocation] = useState(false)
    const pet = route.params

    useEffect(() => {
        getCurrentPosition()
    }, []);

    //************GET CURRENT POSITION*******************
    const getCurrentPosition = async () => {

        let {status} = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return;
        }

        let reg = await Location.getCurrentPositionAsync({})
        await onChangeRegion(reg["coords"])
        setRegion({latitude: reg["coords"].latitude, longitude: reg["coords"].longitude})
    }

    //************LOAD IMAGE*******************
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

    //************DATE PIKER and AUXILIARIES*******************
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (date) => {
        setDateOfSeen(getDate(date))
        setAgeDate(date)
        hideDatePicker()
    }

    const getDate = (dateInput) => {
        const dateArray = dateInput.toLocaleDateString().split("/")
        return ([dateArray[1], dateArray[0], dateInput.getFullYear()].join("/"))
    }

    //************MAP AUXILIARIES*******************
    const mapDir = (index, dire) => {
        return {id: index, name: dire.nomenclatura}
    }

    const onSelected = async (item) => {
        let reg = await Location.geocodeAsync(item.name)
        setLocation(item)
        setRegion({latitude: reg[0].latitude, longitude: reg[0].longitude})
    }

    const onChangeText = async (dir) => {
        try {
            let algo = await getDir(dir)
            setLocation([])
            setLocations(algo.data["direcciones"].map((dire, index) => mapDir(index, dire)))
        } catch (e) {
            console.log(e)
        }
    }

    const onRemoveItem = () => {
        setLocations([])
        setLocation({})
    }

    const onChangeRegion = async (newRegion) => {
        setRegion(newRegion)
        let reg = await Location.reverseGeocodeAsync(newRegion)
        setLocation({id: 1, name: `${reg[0].street}, ${reg[0].streetNumber}, ${reg[0].city}`})
    }

    // *********************PUBLISH*********************
    const publish = async () => {

        setLoading(true)
        const userEmail = await AsyncStorage.getItem("user_id")
        const imageUpload = await uploadedImage()
        const comment = {
            "petID": pet.id,
            "image": imageUpload,
            "dateOfSeen": dateOfSeen ? dateOfSeen : getDate(new Date()),
            "commentary": commentary,
            "contact": userEmail,
            "coordinates": wantLocation ? region : {latitude: '', longitude: ''}
        }

        try {
            await createComment(comment)
        } catch (error) {
            setErrors(error.errors)
        }
        try {
            await sendPushNotification(pet, userEmail)
            navigation.navigate("Detalles", pet.id)
        } catch (e) {
            Alert.alert(
                "Notificación",
                "No se ha podido enviar la notificación. ¿Desa continuar?",
                [{text: "OK", onPress: () => navigation.navigate("Detalles", pet.id)}, {
                    text: "Cancel",
                    onPress: () => console.log(e)
                }])
        }
        setLoading(false)
    }
    return (
        <ScrollView style={style.fullContainer}>
            <Loader loading={loading}/>
            <Back onPress={() => navigation.goBack()}
                  headerStyle={petCreationScreenStyle.header}/>
            <ImageForm
                imageUri={imageUri}
                onPress={pickAnImage}
            />

            <Form
                GenericInput={"Cargar un comentario"}
                onButtonPress={() => publish()}
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
                    value={commentary}
                    label={"Cuentanos un poco sobre el encuentro"}
                    onChangeText={setCommentary}
                />
                <SimpleCheckBox
                    status={wantLocation ? "checked" : "unchecked"}
                    onPress={() => {
                        setWantLocation(!wantLocation)
                    }}
                    text={"¿Queres poner una ubicación?"}
                />

                {wantLocation && <MapViewWithLabel region={region} onSelected={(item) => onSelected(item)}
                                                   removeItem={() => onRemoveItem()} location={location}
                                                   locations={locations}
                                                   onPressMap={(e) => onChangeRegion(e.nativeEvent.coordinate)}
                                                   onDragMarker={(e) => setRegion(e.nativeEvent.coordinate)}
                                                   onChangeText={(text) => onChangeText(text)}/>}
            </Form>
        </ScrollView>
    )
}

async function sendPushNotification(pet, comment) {
    const user = await getUserByEmail(pet.user)
    const tokens = user.data.expoPushToken
    const message = {
        to: tokens,
        title: "Nuevo comentario sobre" + pet.name,
        body: comment.contact,
        data: {id: pet.id},
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




