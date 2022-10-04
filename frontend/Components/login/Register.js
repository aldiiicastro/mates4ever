import { Form, FormItem } from 'react-native-form-component'
import React, {useEffect, useState} from 'react'
import { Picker } from 'react-native-form-component';
import {ScrollView, Text, View} from "react-native";
import ImageView from "./ImageView";
import {colors} from "../../styles/Colors";
import {createUser, getMunicipalities, getProvince} from "../../server/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {registerScreenStyle} from "../../styles/RegisterScreenStyle";
import Loader from "../Loader";


export default function Register({navigation}) {
    const [userName, setUserName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [location, setLocation] = useState('')
    const [municipalities, setMunicipalities] = useState('')
    const [province, setProvince] = useState('')
    const [provinces, setProvinces] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(true)
    const handleSubmitButton = () => {
        const dataToSend = {
            name: userName,
            lastname: lastName,
            email: userEmail,
            phoneNumber: phoneNumber,
            location: location,
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
    const getProvinces = async () => {
        setLoading(true)
        await getProvince().then((response) =>
            setProvinces(response.data.provincias.sort(
                (province1, province2) => (province1.nombre > province2.nombre))
            )
        )
        setLoading(false)
    }

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

    useEffect(()=> {getProvinces()}, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.yellow, padding: 24 }}>
            {loading ?
                <Loader loading={loading} /> :
                <ScrollView>
                    <ImageView/>
                    <Form buttonText={'Registrarse'} onButtonPress={() => handleSubmitButton()} buttonStyle={{backgroundColor:colors.violet}}>
                        <FormItem
                            value={userName}
                            label="Nombre"
                            labelStyle={{backgroundColor: colors.trans}}
                            onChangeText={(firstname) => setUserName(firstname)}
                            showErrorIcon={false}
                            floatingLabel
                            isRequired
                            asterik
                        />
                        <FormItem
                            value={lastName}
                            label="Apellido"
                            onChangeText={(lastName) => setLastName(lastName)}
                            showErrorIcon={false}
                            asterik
                            floatingLabel
                            isRequired
                        />
                        <FormItem
                            value={userEmail}
                            label="Email"
                            onChangeText={(userEmail) => setUserEmail(userEmail)}
                            showErrorIcon={false}
                            keyboardType={'email-address'}
                            asterik
                            floatingLabel
                            isRequired
                        />
                        <FormItem
                            value={phoneNumber}
                            label="Número de teléfono"
                            keyboardType='numeric'
                            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                            showErrorIcon={false}
                            floatingLabel
                        />
                        <FormItem
                            value={userPassword}
                            label="Contraseña"
                            onChangeText={(userPassword) => setUserPassword(userPassword)}
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
                            asterik
                        />
                        { !province ?
                            < Picker
                                items={[]}
                                label="Elegir la ciudad"
                                placeholder="Sin selección"
                                asterik
                            />
                            : < Picker
                            items={municipalities.map((municipality) => ({label: municipality.nombre, value: municipality.nombre}))}
                            label="Elegir la ciudad"
                            placeholder="Sin selección"
                            selectedValue={location}
                            onSelection={(item) => setLocation(item.value)}
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
