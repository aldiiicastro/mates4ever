import React, {createRef, useEffect, useState} from "react"
import {Form} from "react-native-form-component"
import {ScrollView} from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Location from 'expo-location'
import {createComment, getDir} from "../../server/Api"
import {handleImagesPicked, pickMultipleImage} from "../../server/FirebaseServer"
import Loader from "../drawerlayout/Loader"
import {
    CalendarForm, EmptyImage,
    MultiLineLabelRequired,
    SimpleCheckBox
} from "../drawerlayout/FormItemGeneric"
import {style} from "../../styles/Commons"
import Back from "../drawerlayout/Back"
import {Alert, FlatList, Image, SafeAreaView, View} from "react-native"
import MapViewWithLabel from "../map/MapViewWithLabel"
import Icon from "react-native-vector-icons/MaterialIcons"
import {sendCommentNotifications} from "../Notifications";
import {commentScreenStyle} from "../../styles/CommentScreenStyle";
import {getDate, mapDir} from "../drawerlayout/CommonFunctions";

export default function CommentScreen({navigation, route}) {
    const [images, setImages] = useState(null)
    const [dateOfSeen, setDateOfSeen] = useState(null)
    const [ageDate, setAgeDate] = useState(new Date())
    const [commentary, setCommentary] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
    const [region, setRegion] = useState({latitude: -36.6769415180527, longitude: -60.5588319815719})
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState({})
    const [changeText, setChangeText] = useState('')
    const [wantLocation, setWantLocation] = useState(false)
    const [close, setClose] = useState(false)
    const pet = route.params
    const commentInputRef = createRef()

    useEffect(() => {
        getCurrentPosition()
    }, [])

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
        const pickerResult = await pickMultipleImage()
        if (pickerResult.cancelled) {
            setImages(undefined)
        } else {
            setImages(pickerResult["selected"])
        }

    }

    const uploadedImage = async () => {
        if (!images) {
            return []
        }
        return await handleImagesPicked(images)
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


    //************MAP AUXILIARIES*******************
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
        if (commentary) {
            setErrors("Debe escribir un comentario")
        }
        setLoading(true)
        const userEmail = await AsyncStorage.getItem("user_id")
        let imageUpload = []
        try {
            imageUpload = await uploadedImage()
        } catch (e) {
            console.log(e)
        }
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
            alert("Hubo un problema. Contactese con el administador")
        }
        try {
            await sendCommentNotifications(pet, userEmail)
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
        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={style.fullContainer}>
            <Loader loading={loading}/>
            <Back onPress={() => navigation.goBack()} text="Crear un comentario"
                  headerStyle={commentScreenStyle.header}/>
            <View style={commentScreenStyle.image} on>
                <FlatList horizontal={true}
                          ListEmptyComponent={ <EmptyImage onPress={pickAnImage}/>}
                          data={images} renderItem={(item)=> {
                    return <Image source= { {uri: item["item"].uri}} style={commentScreenStyle.imageSize}/>}}/>
                <View style={commentScreenStyle.imageIcon}>
                    <Icon name="create" size={28} onPress={() => pickAnImage()} />
                </View>
            </View>

            <Form
                GenericInput={"Crear un comentario"}
                onButtonPress={() => publish()}
                buttonStyle={commentScreenStyle.formButtonStyle}
                buttonText="Comentar"
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
                <MultiLineLabelRequired
                    ref={commentInputRef}
                    value={commentary}
                    label={"Cuentanos un poco sobre el encuentro"}
                    onChangeText={setCommentary}
                    isRequired
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
                                                   close={close}
                                                   changeText={changeText}
                                                   onPressMap={(e) => onChangeRegion(e.nativeEvent.coordinate)}
                                                   onDragMarker={(e) => setRegion(e.nativeEvent.coordinate)}
                                                   onChangeText={(text) => onChangeText(text)}/>}
            </Form>
        </ScrollView>
        </SafeAreaView>
    )
}




