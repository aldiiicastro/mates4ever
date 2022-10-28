import React, {createRef, forwardRef, useEffect, useState} from 'react'
import {Form, FormItem} from 'react-native-form-component'
import {Picker} from 'react-native-form-component'
import {ScrollView, Text, View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ImageView from "../drawerlayout/ImageView"
import {FormItemGeneric} from "../drawerlayout/FormItemGeneric"
import Loader from "../Loader"
import {registerScreenStyle} from "../../styles/RegisterScreenStyle"
import {colors} from "../../styles/Colors"
import {createUser, getMunicipalities, getProvince} from "../../server/Api"

const RegisterScreen = forwardRef(({navigation}, ref) => {
    const [userName, setUserName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userConfirmEmail, setUserConfirmEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userStreet, setUserStreet] = useState('')
    const [userStreetNumber, setUserStreetNumber] = useState('')
    const [municipality, setMunicipality] = useState('')
    const [municipalities, setMunicipalities] = useState('')
    const [province, setProvince] = useState('')
    const [provinces, setProvinces] = useState('')
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
    const userStreetInputRef = createRef()
    const userStreetNumberInputRef = createRef()


    const handleSubmitButton = () => {
        setLoading(true)
        const dataToSend = {
            name: userName,
            lastname: lastName,
            email: userEmail,
            phone: phoneNumber,
            street: userStreet,
            streetNumber: userStreetNumber,
            municipality: municipality,
            province: province,
            password: userPassword,
            pets: [],
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

    //Getting provinces from the API. And order by name (ASC)
    const getProvinces = async () => {
        setLoading(true)
        await getProvince().then((response) =>
            setProvinces(response.data.provincias.sort(
                (province1, province2) => (province1.nombre > province2.nombre))
            )
        )
        setLoading(false)
    }

    //Giving a province, searching all the municipalities of that province. And order by name (ASC)
    const setProvinceAndMunicipality = async (provinceName) => {
        setProvince(provinceName)
        setLoading(true)
        await getMunicipalities(provinceName).then((response) =>
            setMunicipalities(response.data.municipios.sort(
                (municipality1, municipality2) => (municipality1.nombre > municipality2.nombre))
            )
        )
        setLoading(false)
    }

    //[] means that useEffect runs in the first render.
    useEffect(() => {
        getProvinces()
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: colors.yellow, padding: 24}}>
            <Loader loading={loading}/>
            {loading ?
                <Loader loading={loading}/> :
                <ScrollView>
                    <ImageView/>
                    <Form GenericInput={'Registrarse'} onButtonPress={() => handleSubmitButton()}
                          buttonStyle={{backgroundColor: colors.violet}}>
                        <FormItemGeneric
                            value={userName}
                            label={"Nombre"}
                            onChange={(firstname) => setUserName(firstname)}
                            inputRef={() => lastNameInputRef.current && lastNameInputRef.current.focus()}
                            ref={ref}
                            keyboardType={"default"}
                        />
                        <FormItemGeneric
                            value={lastName}
                            label={"Apellido"}
                            onChange={(lastName) => setLastName(lastName)}
                            inputRef={() => emailInputRef.current && emailInputRef.current.focus()}
                            ref={lastNameInputRef}
                            keyboardType={"default"}
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
                                return {status: (userConfirmEmail === userEmail), message: "No coinciden los emails"}
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
                            ref={phoneNumberInputRef}
                            onSubmitEditing={() => userStreetInputRef.current && userStreetInputRef.current.focus()}
                            floatingLabel
                        />
                        <FormItemGeneric
                            value={userStreet}
                            label={"Calle"}
                            onChange={(street) => setUserStreet(street)}
                            inputRef={() => userStreetNumberInputRef.current && userStreetNumberInputRef.current.focus()}
                            ref={userStreetInputRef}
                            keyboardType={"default"}
                        />
                        <FormItem
                            value={userStreetNumber}
                            label="Altura"
                            onChangeText={(streetNumber) => setUserStreetNumber(streetNumber)}
                            showErrorIcon={false}
                            keyboardType={"default"}
                            ref={userStreetNumberInputRef}
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            floatingLabel
                            isRequired
                            asterik
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
                        <Picker
                            items={provinces.map((province) => ({label: province.nombre, value: province.nombre}))}
                            label="Elegir una provincia"
                            placeholder="Sin selección"
                            selectedValue={province}
                            onSelection={(item) => setProvinceAndMunicipality(item.value)}
                            asterik
                        />
                        {!province ?
                            < Picker
                                items={[]}
                                label="Elegir la ciudad"
                                placeholder="Sin selección"
                                selectedValue={municipality}
                                onSelection={() => {
                                }}
                                asterik
                            />
                            : < Picker
                                items={municipalities.map((municipality) => ({
                                    label: municipality.nombre,
                                    value: municipality.nombre
                                }))}
                                label="Elegir la ciudad"
                                placeholder="Sin selección"
                                selectedValue={municipality}
                                onSelection={(item) => setMunicipality(item.value)}
                                asterik
                            />}
                        {errorText !== '' ? (
                            <Text style={registerScreenStyle.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : null}
                    </Form>
                </ScrollView>
            }
        </View>
    )
})

export default RegisterScreen
