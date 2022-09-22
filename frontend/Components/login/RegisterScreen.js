import React, {useState, createRef} from 'react'
import {View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView,} from 'react-native'
import {registerScreenStyle} from "../../styles/RegisterScreenStyle"
import ImageView from "./ImageView"
import PasswordInput from "./PasswordInput"
import GenericInput from "./GenericInput";

const RegisterScreen = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errortext, setErrortext] = useState('')
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false)

    const emailInputRef = createRef()
    const phoneNumberInputRef = createRef()
    const passwordInputRef = createRef()

    const handleSubmitButton = () => {
        setErrortext('')
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
        var dataToSend = {
            name: userName,
            email: userEmail,
            password: userPassword,
        }
        var formBody = []
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key)
            var encodedValue = encodeURIComponent(dataToSend[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencodedcharset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                console.log(responseJson)
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    setIsRegistraionSuccess(true)
                    console.log(
                        'Registration Successful. Please Login to proceed'
                    )
                } else {
                    setErrortext(responseJson.msg)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    if (isRegistraionSuccess) {
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
    return (
        <View style={registerScreenStyle.unsuccessfulView}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={registerScreenStyle.contentContainerStyle}>
               <ImageView/>
                <KeyboardAvoidingView enabled>
                    <GenericInput placeHolder={"Ingresar nombre y apellido"} onChange={(UserName) => setUserName(UserName)} inputRef={() => emailInputRef.current && emailInputRef.current.focus()} keyboardType={"default"}  reference={createRef()}/>
                    <GenericInput placeHolder={"Ingresar mail"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()} keyboardType={"email-address"} reference={emailInputRef}/>
                    <GenericInput placeHolder={"Ingresar su número de telefono"} onChange={(PhoneNumber) => setPhoneNumber(PhoneNumber)} inputRef={() => {}} keyboardType={"numeric"} reference={phoneNumberInputRef}/>
                    <PasswordInput onChange={(UserPassword) => setUserPassword(UserPassword)} passwordInputRef={passwordInputRef}/>
                    {errortext !== '' ? (
                        <Text style={registerScreenStyle.errorTextStyle}>
                            {errortext}
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
