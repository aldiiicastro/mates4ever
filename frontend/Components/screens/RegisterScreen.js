import React, {createRef, forwardRef, useEffect, useState} from 'react'
import {Form, FormItem} from 'react-native-form-component'
import {Platform, ScrollView, View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ImageView from "../drawerlayout/ImageView"
import {FormItemGeneric} from "../drawerlayout/FormItemGeneric"
import Loader from "../drawerlayout/Loader"
import {colors} from "../../styles/Colors"
import {createUser, getDir} from "../../server/Api"
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import SearchableDropdown from "react-native-searchable-dropdown";
import MapView, {Circle, Marker} from "react-native-maps";
import * as Location from "expo-location";
import Back from "../drawerlayout/Back";
import {registerScreenStyle} from "../../styles/RegisterScreenStyle";
import MapViewWithLabel from "../map/MapViewWithLabel";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const RegisterScreen = forwardRef(({navigation}, ref) => {
        const [region, setRegion] = useState({latitude: -36.6769415180527, longitude: -60.5588319815719})
        const [locations, setLocations] = useState([])

        const [location, setLocation] = useState({id: 1, name: ''})
        const [expoPushToken, setExpoPushToken] = useState('');
        const [userName, setUserName] = useState('')
        const [lastName, setLastName] = useState('')
        const [userEmail, setUserEmail] = useState('')
        const [userConfirmEmail, setUserConfirmEmail] = useState('')
        const [phoneNumber, setPhoneNumber] = useState('')
        const [userPassword, setUserPassword] = useState('')
        const [userConfirmPassword, setUserConfirmPassword] = useState('')
        const [errorText, setErrorText] = useState('')
        const [loading, setLoading] = useState(true)
        const emailInputRef = createRef()
        const reEmailInputRef = createRef()
        const phoneNumberInputRef = createRef()
        const provinceInputRef = createRef()
        const passwordInputRef = createRef()
        const rePasswordInputRef = createRef()
        const lastNameInputRef = createRef()
        const nameInputRef = createRef()
        const userStreetInputRef = createRef()
        const [close, setClose] = useState(false)
        const [changeText, setChangeText] = useState('')
        const getCurrentPosition = async () => {
            setLoading(true)
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                return
            }

            let reg = await Location.getCurrentPositionAsync({})
            await onChangeRegion(reg["coords"])
            setLoading(false)
        }
        const dataToSend = {
            name: userName,
            lastname: lastName,
            email: userEmail,
            phone: phoneNumber,
            coordinates: region,
            password: userPassword,
            expoPushToken: expoPushToken,
            pets: [],
        }

        const handleSubmitButton = async () => {
            setLoading(true)
            try {
                const response = await createUser(dataToSend)
                setLoading(false)
                await AsyncStorage.setItem('user_id', response.data.email)
                navigation.navigate('Inicio')
            } catch (error) {
                setLoading(false)
                setErrorText(error.response.data)
            }
        }


        const mapDir = (index, dire) => {
            return {id: index, name: dire.nomenclatura}
        }

        const onChangeText = async (dir) => {
            setClose(false)
            try {
                let allDir = await getDir(dir)
                setChangeText(dir)
                setLocations(allDir.data["direcciones"].map((dire, index) => mapDir(index, dire)))
            } catch (e) {
                setChangeText('')
                console.log(e)
            }
        }
        const onChangeRegion = async (newRegion) => {
            setRegion(newRegion)
            let reg = await Location.reverseGeocodeAsync(newRegion)
            setLocation({id: 1, name: `${reg[0].street}, ${reg[0].streetNumber}, ${reg[0].city}`})
        }
        const onSelected = async (item) => {
            setClose(true)
            let reg = await Location.geocodeAsync(item.name)
            setLocation(item)
            setRegion({latitude: reg[0].latitude, longitude: reg[0].longitude})
        }
        //[] means that useEffect runs in the first render.
        useEffect(() => {
            getCurrentPosition()
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
        }, [])

        return (
            <View style={{flex: 1, backgroundColor: colors.yellow, padding: 24}}>
                <Back onPress={() => navigation.goBack()} headerStyle={registerScreenStyle.header}/>
                <Loader loading={loading}/>
                {loading ?
                    <Loader loading={loading}/> :
                    <ScrollView>
                        <ImageView/>
                        <Form buttonText={'Registrarse'} GenericInput={'Registrarse'} onButtonPress={() => handleSubmitButton()}
                              buttonStyle={{backgroundColor: colors.violet}}>
                            <FormItemGeneric
                                value={userName}
                                label={"Nombre"}
                                onChange={(firstname) => setUserName(firstname)}
                                inputRef={() => lastNameInputRef.current && lastNameInputRef.current.focus()}
                                ref={nameInputRef}
                                keyboardType={"default"}
                                isRequired
                            />
                            <FormItemGeneric
                                value={lastName}
                                label={"Apellido"}
                                onChange={(lastName) => setLastName(lastName)}
                                inputRef={() => emailInputRef.current && emailInputRef.current.focus()}
                                ref={lastNameInputRef}
                                keyboardType={"default"}
                                isRequired
                            />
                            <FormItemGeneric
                                value={userEmail}
                                label={"Email"}
                                onChange={(userEmail) => setUserEmail(userEmail)}
                                inputRef={() => reEmailInputRef.current && reEmailInputRef.current.focus()}
                                ref={emailInputRef}
                                keyboardType={"email-address"}
                            />
                            <FormItem
                                value={userConfirmEmail}
                                label={"Confirmar Email"}
                                onChangeText={(userConfirmEmail) => setUserConfirmEmail(userConfirmEmail)}
                                onSubmitEditing={() => phoneNumberInputRef.current && phoneNumberInputRef.current.focus()}
                                ref={reEmailInputRef}
                                keyboardType={"email-address"}
                                customValidation={() => {
                                    return {
                                        status: (userConfirmEmail === userEmail),
                                        message: "No coinciden los emails"
                                    }
                                }}
                                showErrorIcon={false}
                                asterik
                                floatingLabel
                                isRequired
                            />
                            <FormItem
                                value={phoneNumber}
                                label="Número de teléfono"
                                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                                showErrorIcon={false}
                                keyboardType={"phone-pad"}
                                // ref={phoneNumberInputRef}
                                onSubmitEditing={() => userStreetInputRef.current && userStreetInputRef.current.focus()}
                                floatingLabel
                            />

                            <FormItem
                                value={userPassword}
                                label="Contraseña"
                                onChangeText={(userPassword) => setUserPassword(userPassword)}
                                inputRef={() => rePasswordInputRef.current && rePasswordInputRef.current.focus()}
                                ref={passwordInputRef}
                                showErrorIcon={false}
                                asterik
                                floatingLabel
                                isRequired
                                secureTextEntry
                            />
                            <FormItem
                                value={userConfirmPassword}
                                label="Confirmar contraseña"
                                onChangeText={(userPassword) => setUserConfirmPassword(userPassword)}
                                inputRef={() => provinceInputRef.current && provinceInputRef.current.focus()}
                                ref={rePasswordInputRef}
                                showErrorIcon={false}
                                customValidation={() => {
                                    return {
                                        status: (userConfirmPassword === userPassword),
                                        message: "No coinciden las contraseñas"
                                    }
                                }}
                                asterik
                                floatingLabel
                                isRequired
                                secureTextEntry
                            />
                            <MapViewWithLabel region={region} onSelected={(item) => onSelected(item)}
                                              locations={locations}
                                              location={location}
                                              changeText={changeText}
                                              close={close}
                                              onPressMap={(e) => onChangeRegion(e.nativeEvent.coordinate)}
                                              onDragMarker={(e) => setRegion(e.nativeEvent.coordinate)}
                                              onChangeText={(text) => onChangeText(text)}/>
                        </Form>
                    </ScrollView>
                }

            </View>
        )
    }


)


async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

export default RegisterScreen
