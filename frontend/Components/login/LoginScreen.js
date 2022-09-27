import React, {useState, createRef} from 'react'
import {View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "../Loader.js"
import {loginScreenStyle} from "../../styles/LoginScreenStyle"
import ImageView from "./ImageView"
import PasswordInput from "./PasswordInput"
import GenericInput from "./GenericInput";

const LoginScreen = ({navigation}) => {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errortext, setErrortext] = useState('')
    const emailInputRef = createRef()
    const passwordInputRef = createRef()

    const handleSubmitPress = () => {
        setErrortext('')
        if (!userEmail) {
            alert('Please fill Email')
            return
        }
        if (!userPassword) {
            alert('Please fill Password')
            return
        }
        setLoading(true)
        let dataToSend = {email: userEmail, password: userPassword}
        let formBody = []
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key)
            let encodedValue = encodeURIComponent(dataToSend[key])
            formBody.push(encodedKey + '=' + encodedValue)
        }
        formBody = formBody.join('&')

        fetch('http://localhost:3000/api/user/login', {
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
                setLoading(false)
                console.log(responseJson)
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    AsyncStorage.setItem('user_id', responseJson.data.email)
                    console.log(responseJson.data.email)
                    navigation.replace('DrawerNavigationRoutes')
                } else {
                    setErrortext(responseJson.msg)
                    console.log('Please check your email id or password')
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false)
            })
    }

    return (
        <View style={loginScreenStyle.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <ImageView/>
                        <GenericInput placeHolder={"Ingresar mail"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()} keyboardType={"email-address"} reference={emailInputRef}/>
                        <PasswordInput onChange={(UserPassword) => setUserPassword(UserPassword)} passwordInputRef={passwordInputRef}/>
                        {errortext !== '' ? (
                            <Text style={loginScreenStyle.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={loginScreenStyle.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={loginScreenStyle.buttonTextStyle}>Iniciar sesión</Text>
                        </TouchableOpacity>
                        <Text
                            style={loginScreenStyle.registerTextStyle}
                            onPress={() => navigation.navigate('Registro')}>
                            ¿Aún no tienes cuenta? Registrate acá
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    )
}
export default LoginScreen
