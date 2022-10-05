import { Form, FormItem } from 'react-native-form-component'
import React, {createRef, useEffect, useState} from 'react'
import { Picker } from 'react-native-form-component';
import {ScrollView, Text, View} from "react-native";
import ImageView from "../common/login/ImageView";
import {colors} from "../../styles/Colors";
import {createUser, getMunicipalities, getProvince} from "../../server/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {registerScreenStyle} from "../../styles/RegisterScreenStyle";
import Loader from "../Loader";
import FormItemGeneric from "../common/login/FormItemGeneric";

export default function RegisterScreen({navigation}) {
    const [userName, setUserName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userConfirmEmail, setUserConfirmEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [municipality, setMunicipality] = useState('')
    const [municipalities, setMunicipalities] = useState('')
    const [province, setProvince] = useState('')
    const [provinces, setProvinces] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(true)
    const userNameInputRef = createRef()
    const emailInputRef = createRef()
    const phoneNumberInputRef = createRef()
    const municipalityInputRef = createRef()
    const provinceInputRef = createRef()
    const passwordInputRef = createRef()
    const lastNameInputRef = createRef()


    const handleSubmitButton = () => {
        const dataToSend = {
            name: userName,
            lastname: lastName,
            email: userEmail,
            phoneNumber: phoneNumber,
            municipality: municipality,
            province: province,
            password: userPassword,
        }
        createUser(dataToSend).then(response => {
            AsyncStorage.setItem('user_id', response.data.email)
            navigation.navigate('Inicio')
        }).catch((error) => {
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
    useEffect(()=> {getProvinces()}, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.yellow, padding: 24 }}>
            {loading ?
                <Loader loading={loading} /> :
                <ScrollView>
                    <ImageView/>
                    <Form GenericInput={'Registrarse'} onButtonPress={() => handleSubmitButton()} buttonStyle={{backgroundColor:colors.violet}}>
                        <FormItemGeneric
                            value={userName}
                            label={"Nombre"}
                            onChange={(firstname) => setUserName(firstname)}
                            inputRef={() => lastNameInputRef.current && lastNameInputRef.current.focus()}
                            ref={userNameInputRef}
                            keyboardType={'default'}
                        />
                        <FormItemGeneric
                            value={lastName}
                            label={"Apellido"}
                            onChange={(lastName) => setLastName(lastName)}
                            inputRef={() => emailInputRef.current && emailInputRef.current.focus()}
                            ref={lastNameInputRef}
                            keyboardType={'default'}
                        />
                        <FormItemGeneric
                            value={userEmail}
                            label={"Email"}
                            onChange={(userEmail) => setUserEmail(userEmail)}
                            inputRef={() => phoneNumberInputRef.current && phoneNumberInputRef.current.focus()}
                            ref={emailInputRef}
                            keyboardType={'email-address'}
                        />
                        <FormItemGeneric
                            value={userConfirmEmail}
                            label={"Confirmar Email"}
                            onChange={(userConfirmEmail) => setUserConfirmEmail(userConfirmEmail)}
                            customValidation={() =>Validation()}
                            inputRef={() => phoneNumberInputRef.current && phoneNumberInputRef.current.focus()}
                            ref={emailInputRef}
                            keyboardType={'email-address'}
                        />
                        <FormItemGeneric
                            value={phoneNumber}
                            label="Número de teléfono"
                            onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
                            inputRef={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            ref={phoneNumberInputRef}
                            keyboardType={'numeric'}

                        />
                        <FormItem
                            value={userPassword}
                            label="Contraseña"
                            onChangeText={(userPassword) => setUserPassword(userPassword)}
                            inputRef={() => provinceInputRef.current && provinceInputRef.current.focus()}
                            ref={passwordInputRef}
                            showErrorIcon={false}
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
                            inputRef={() => municipalityInputRef.current && municipalityInputRef.current.focus()}
                            ref={provinceInputRef}
                            asterik
                        />
                        { !province ?
                            < Picker
                                items={[]}
                                label="Elegir la ciudad"
                                placeholder="Sin selección"
                                ref={municipalityInputRef}
                                asterik
                            />
                            : < Picker
                            items={municipalities.map((municipality) => ({label: municipality.nombre, value: municipality.nombre}))}
                            label="Elegir la ciudad"
                            placeholder="Sin selección"
                            selectedValue={municipality}
                            onSelection={(item) => setMunicipality(item.value)}
                            ref={municipalityInputRef}
                            asterik
                            />}
                        {errorText !== '' ? (
                            <Text style={registerScreenStyle.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : null}
                    </Form>
                </ScrollView> }
        </View>
    );
}
