import React, {useState, createRef, useEffect} from 'react'
import {View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView,} from 'react-native'
import {registerScreenStyle} from "../../styles/RegisterScreenStyle"
import ImageView from "./ImageView"
import GenericInput from "./GenericInput";
import {getProvince} from "../../server/Api";
import { Picker } from '@react-native-picker/picker';
import {form} from "../../styles/Form";

const RegisterScreen = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [location, setLocation] = useState('')
    const [province, setProvince] = useState('')
    const [provincias, setProvincias] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [
        isRegistrationSuccess,
        setIsRegistrationSuccess
    ] = useState(false)

    const emailInputRef = createRef()
    const phoneNumberInputRef = createRef()
    const locationInputRef = createRef()
    const provinceInputRef = createRef()
    const passwordInputRef = createRef()
    const reEmailInputRef = createRef()
    const rePasswordInputRef = createRef()
    const handleSubmitButton = () => {
        setErrorText('')
        if (!userName) {
            alert('Por favor, escriba su nombre')
            return
        }
        if (!userEmail) {
            alert('Por favor, escriba su mail')
            return
        }
        if (!userPassword) {
            alert('Por favor, escriba su contraseña')
            return
        }
        const dataToSend = {
            name: userName,
            email: userEmail,
            phoneNumber: phoneNumber,
            location: location,
            province: province,
            password: userPassword,
        }

    }
    if (isRegistrationSuccess) {
        return (
            <View style={registerScreenStyle.imageSuccessfulView}>
                <Image source={require('../../assets/icono.png')} style={registerScreenStyle.imageStyle}/>
                <Text style={registerScreenStyle.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity style={registerScreenStyle.buttonStyle} activeOpacity={0.5} onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={registerScreenStyle.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const getProvinces = () => {
        getProvince().then((response) => {setProvincias(response.data.provincias)})
    }

    useEffect(() => {getProvinces()})
    return (
        <View style={registerScreenStyle.unsuccessfulView}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={registerScreenStyle.contentContainerStyle}>
               <ImageView/>
                <KeyboardAvoidingView enabled>
                    <GenericInput placeHolder={"Ingresar nombre y apellido"} onChange={(UserName) => setUserName(UserName)} inputRef={() => emailInputRef.current && emailInputRef.current.focus()} keyboardType={"default"}  reference={createRef()} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar mail"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()} keyboardType={"email-address"} reference={emailInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Repita su email"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()} keyboardType={"email-address"} reference={reEmailInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar su número de telefono"} onChange={(PhoneNumber) => setPhoneNumber(PhoneNumber)} inputRef={() => {}} keyboardType={"numeric"} reference={phoneNumberInputRef} secureTextEntry={false}/>
                    {/*<GenericInput placeHolder={"Ingresar su localidad"} onChange={(Location) => setLocation(Location)} inputRef={() => {}} keyboardType={"default"} reference={locationInputRef} secureTextEntry={false}/>*/}
                    {/*<GenericInput placeHolder={"Ingresar su provincia"} onChange={(Province) => setProvince(Province)} inputRef={() => {}} keyboardType={"default"} reference={provinceInputRef} secureTextEntry={false}/>*/}
                    <GenericInput placeHolder={"Ingresar contraseña"} onChange={(UserPassword) => setUserPassword(UserPassword)} inputRef={() => {}} keyboardType={"default"} reference={passwordInputRef} secureTextEntry={true}/>
                    <GenericInput placeHolder={"Repita contraseña"} onChange={(UserPassword) => setUserPassword(UserPassword)} inputRef={() => {}} keyboardType={"default"} reference={rePasswordInputRef} secureTextEntry={true}/>
                    <Picker
                        style={form.inputFont}
                        selectedValue={province}
                        onValueChange={currentProvince => setProvince(currentProvince)}>
                        <Picker.Item label="Tipo de publicacion" value={null} />
                        {/*{!provincias && provincias.map((provincia) => <Picker.Item key={provincia.nombre} label={provincia.nombre} value={provincia.nombre} />)}*/}
                    </Picker>
                    {errorText !== '' ? (
                        <Text style={registerScreenStyle.errorTextStyle}>
                            {errorText}
                        </Text>
                    ) : null}
                    <TouchableOpacity style={registerScreenStyle.buttonStyle} activeOpacity={0.5} onPress={handleSubmitButton}>
                        <Text style={registerScreenStyle.buttonTextStyle}>Registrarse</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default RegisterScreen

// fetch('http://localhost:3000/api/user/register', {
//     method: 'POST',
//     body: formBody,
//     headers: {
//         //Header Defination
//         'Content-Type':
//             'application/x-www-form-urlencodedcharset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((responseJson) => {
//         //Hide Loader
//         console.log(responseJson)
//         // If server response message same as Data Matched
//         if (responseJson.status === 'success') {
//             setIsRegistrationSuccess(true)
//             console.log(
//                 'Registration Successful. Please Login to proceed'
//             )
//         } else {
//             setErrorText(responseJson.msg)
//         }
//     })
//     .catch((error) => {
//         console.error(error)
//     })
