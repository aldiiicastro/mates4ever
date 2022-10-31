import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {colors} from '../../styles/Colors.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function PerfilButton({navigation}) {
    const [email, setEmail] = useState({})
    const getUserEmail = async () => {
        setEmail(await AsyncStorage.getItem('user_id'))
    }
    useEffect( () => { getUserEmail() }, [])

    return (
        <View style={{marginTop: -32, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Icon style={{padding: 2, paddingLeft: 4, borderRadius: 100, borderWidth: 1, backgroundColor: colors.white}}
                  name="person" size={25} onPress={() => navigation.navigate('Perfil', email)}/>
        </View>
    )
}
