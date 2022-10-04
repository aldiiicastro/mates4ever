import React, {useState, createRef} from 'react'
import {View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView,} from 'react-native'
import {registerScreenStyle} from "../../styles/RegisterScreenStyle"
import ImageView from "./ImageView"
import GenericInput from "./GenericInput";
import {createUser} from "../../server/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Loader";

const RegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState('')
    const [lastname, setLastname] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [province, setProvince] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorText, setErrorText] = useState('')
const [userNameError, setUserNameError] = useState(false)
    const emailInputRef = createRef()
    const phoneNumberInputRef = createRef()
    const locationInputRef = createRef()
    const provinceInputRef = createRef()
    const passwordInputRef = createRef()
    const reEmailInputRef = createRef()
    const rePasswordInputRef = createRef()
    const lastnameInputRef = createRef()
    const handleSubmitButton = () => {

        const dataToSend = {
            name: userName,
            lastname: lastname,
            email: userEmail,
            phoneNumber: phoneNumber,
            location: location,
            province: province,
            password: userPassword,
        }
        createUser(dataToSend).then(response => {
            setLoading(false)
            AsyncStorage.setItem('user_id', response.data.email)
            navigation.navigate('Inicio')
        }).catch((error) => {
            setLoading(false)
            setErrorText(error.response.data)
        })
    }

    return (
        <View style={registerScreenStyle.unsuccessfulView}>
            <Loader loading={loading} />
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={registerScreenStyle.contentContainerStyle}>
               <ImageView/>
                <KeyboardAvoidingView enabled>
                    <GenericInput placeHolder={"Ingresar nombre"}
                                  error={userNameError}
                                  onChange={(UserName) => {
                                    setUserName(UserName)
                                    setUserNameError('')
                                  }}
                                  inputRef={() => lastnameInputRef.current && lastnameInputRef.current.focus()}
                                  keyboardType={"default"}
                                  reference={createRef()}
                                  secureTextEntry={false}/>
                    {userNameError ?         (
                        <Text style={registerScreenStyle.errorTextStyle}>
                            Escriba su nombre
                        </Text>
                    ) :
                null
                    }
                    <GenericInput placeHolder={"Ingresar apellido"} onChange={(LastName) => setLastname(LastName)} inputRef={() => emailInputRef.current && emailInputRef.current.focus()} keyboardType={"default"}  reference={lastnameInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar mail"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => reEmailInputRef.current && reEmailInputRef.current.focus()} keyboardType={"email-address"} reference={emailInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Repita su email"} onChange={(UserEmail) => setUserEmail(UserEmail)} inputRef={() => phoneNumberInputRef.current && phoneNumberInputRef.current.focus()} keyboardType={"email-address"} reference={reEmailInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar su número de telefono"} onChange={(PhoneNumber) => setPhoneNumber(PhoneNumber)} inputRef={() => locationInputRef.current && locationInputRef.current.focus()} keyboardType={"numeric"} reference={phoneNumberInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar su localidad"} onChange={(Location) => setLocation(Location)} inputRef={() => provinceInputRef.current && provinceInputRef.current.focus()} keyboardType={"default"} reference={locationInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar su provincia"} onChange={(Province) => setProvince(Province)} inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()} keyboardType={"default"} reference={provinceInputRef} secureTextEntry={false}/>
                    <GenericInput placeHolder={"Ingresar contraseña"} onChange={(UserPassword) => setUserPassword(UserPassword)} inputRef={() => rePasswordInputRef.current && rePasswordInputRef.current.focus()} keyboardType={"default"} reference={passwordInputRef} secureTextEntry={true}/>
                    <GenericInput placeHolder={"Repita contraseña"} onChange={(UserPassword) => setUserPassword(UserPassword)} inputRef={() => {}} keyboardType={"default"} reference={rePasswordInputRef} secureTextEntry={true}/>
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
