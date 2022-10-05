import React, {useState, createRef} from 'react'
import {View, Text, ScrollView, KeyboardAvoidingView,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "../Loader.js"
import {loginScreenStyle} from "../../styles/LoginScreenStyle"
import ImageView from "../common/login/ImageView"
import { Form, FormItem } from 'react-native-form-component'
import {getUserByEmail} from "../../server/Api";
import {colors} from "../../styles/Colors";
import FormItemGeneric from "../common/login/FormItemGeneric";

const LoginScreen = ({navigation}) => {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState('')
    const emailInputRef = createRef()
    const passwordInputRef = createRef()

    const handleSubmitPress = () => {
        setLoading(true)
        let dataToSend = {email: userEmail, password: userPassword}
        getUserByEmail(dataToSend).then(response => {
            console.log(response)
            setLoading(false)
            AsyncStorage.setItem('user_id', response.data.email)
            navigation.navigate('Inicio')
        }).catch((error) => {
            setLoading(false)
            console.log(error.response.data)
            setErrorText(error.response.data.message)
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
                <View style={{ flex: 1, backgroundColor: colors.yellow, padding: 24 }}>
                    <KeyboardAvoidingView enabled>
                        <ImageView/>
                        <Form buttonText={'Iniciar sesión'} onButtonPress={() => handleSubmitPress()} buttonStyle={{backgroundColor:colors.violet}}>
                            <FormItemGeneric
                                value={userEmail}
                                label={"Email"}
                                onChange={(userEmail) => setUserEmail(userEmail)}
                                inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()}
                                ref={emailInputRef}
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
                            />
                          {errorText !== '' ? (<Text style={loginScreenStyle.errorTextStyle}>{errorText}</Text>) : null}
                        </Form>
                        <Text style={loginScreenStyle.registerTextStyle} onPress={() => navigation.navigate('Registro')}>
                            ¿Aún no tienes cuenta? Registrate acá
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    )
}
export default LoginScreen
