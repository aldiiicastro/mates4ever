import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Image, View} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUserByEmail} from "../../server/Api";
import {splashScreenStyle} from "../../styles/SplashScreenStyle";

export default function SplashScreen({navigation}) {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true)
    const checkIfAlreadyLogin = async () => {
        setTimeout(async () => {
            setAnimating(false)
            //Check if user_id is set or not
            //If not then send for Authentication
            //else send to Home Screen
            const userEmail = await AsyncStorage.getItem('user_id')
            if (userEmail === null) {
                navigation.replace('Login')
            } else {
                try {
                    await getUserByEmail(userEmail)
                    navigation.replace('Inicio')
                } catch (error) {
                    navigation.replace('Login')
                }
            }
        }, 5000)
    }
    useEffect(() => {
        checkIfAlreadyLogin()
    }, [])

    return (<View style={splashScreenStyle.container}>
        <Image
            source={require('../../assets/icono.png')}
            style={{width: '80%', resizeMode: 'contain', margin: 30, borderRadius: 10}}
        />
        <ActivityIndicator
            animating={animating}
            color="rgba(160,122,190,0.76)"
            size="large"
            style={splashScreenStyle.activityIndicator}
        />
    </View>)
}

