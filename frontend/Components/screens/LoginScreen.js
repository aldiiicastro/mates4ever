import React, {useState, createRef, forwardRef} from 'react'
import {View, Text, ScrollView, KeyboardAvoidingView, SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "../drawerlayout/Loader.js"
import {loginScreenStyle} from "../../styles/LoginScreenStyle"
import ImageView from "../drawerlayout/ImageView"
import {Form, FormItem} from 'react-native-form-component'
import {loginUser} from "../../server/Api"
import {colors} from "../../styles/Colors"
import {FormItemGeneric} from "../drawerlayout/FormItemGeneric"

const LoginScreen = forwardRef(({navigation}, ref) => {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState('')
    const passwordInputRef = createRef()

    const handleSubmitPress = () => {
        setLoading(true)
        let dataToSend = {email: userEmail, password: userPassword}
        loginUser(dataToSend).then(response => {
                setLoading(false)
                AsyncStorage.setItem('user_id', response.data.email)
                navigation.navigate('Inicio')
        }).catch((error) => {
            setLoading(false)
            setErrorText(error.response.data.message)
        })
    }
    return (
        <SafeAreaView style={{flex: 1}}>

            <View style={loginScreenStyle.mainBody}>
                <Loader loading={loading}/>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <View style={{flex: 1, backgroundColor: colors.yellow, padding: 24}}>
                        <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
                            <ImageView/>
                            <Form buttonText={'Iniciar sesión'} onButtonPress={() => handleSubmitPress()}
                                  buttonStyle={{backgroundColor: colors.violet}}>
                                <FormItemGeneric
                                    value={userEmail}
                                    label={"Email"}
                                    onChange={(userEmail) => setUserEmail(userEmail)}
                                    inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()}
                                    ref={ref}
                                    keyboardType={'email-address'}
                                />
                                <FormItem
                                    value={userPassword}
                                    label="Contraseña"
                                    onChangeText={(userPassword) => setUserPassword(userPassword)}
                                    showErrorIcon={false}
                                    ref={passwordInputRef}
                                    asterik
                                    floatingLabel
                                    isRequired
                                    secureTextEntry
                                    initialPassword={true}
                                />
                                {errorText !== '' ? (
                                    <Text style={loginScreenStyle.errorTextStyle}>{errorText}</Text>) : null}
                            </Form>
                            <Text style={loginScreenStyle.registerTextStyle}
                                  onPress={() => navigation.navigate('Registro')}>
                                ¿Aún no tienes cuenta? Registrate acá
                            </Text>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
})
export default LoginScreen
