import React, {useState, createRef} from 'react'
import {View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "../Loader.js"
import {loginScreenStyle} from "../../styles/LoginScreenStyle"
import ImageView from "./ImageView"
import GenericInput from "./GenericInput";
import {getUserByEmail} from "../../server/Api";

const LoginScreen = ({navigation}) => {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState('')
    const emailInputRef = createRef()
    const passwordInputRef = createRef()

    const handleSubmitPress = () => {
        setErrorText('')
        if (!userEmail) {
            alert('Por favor completar email')
            return
        }
        if (!userPassword) {
            alert('Please fill Password')
            return
        }
        setLoading(true)
        let dataToSend = {email: userEmail, password: userPassword}
        getUserByEmail(dataToSend).then(response => {
            setLoading(false)
            AsyncStorage.setItem('user_id', response.data.email)
            navigation.navigate('Inicio')
        }).catch((error) => {
            setLoading(false)
            setErrorText(error.response.data)
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
                        <GenericInput placeHolder={"Ingresar mail"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()} keyboardType={"email-address"} reference={emailInputRef} secureTextEntry={false}/>
                        <GenericInput placeHolder={"Ingresar contraseña"} onChange={(UserPassword) => setUserPassword(UserPassword)} inputRef={() => {}} keyboardType={"default"} reference={passwordInputRef} secureTextEntry={true}/>
                        {errorText !== '' ? (
                            <Text style={loginScreenStyle.errorTextStyle}>
                                {errorText}
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
