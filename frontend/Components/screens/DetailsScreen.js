import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import PetDetails from '../pets/details/PetDetails.js'
import {style} from "../../styles/Commons.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getPetById} from "../../server/Api.js"
import Pet from '../../model/Pet.js'
import {petDetailsStyle} from "../../styles/pet/PetDetailsStyle";

export default function DetailsScreen({navigation, route}) {
    const [pet, setPet] = useState({})
    const getPet = async () => {
        try {
            const response = await getPetById(route.params)
            setPet(new Pet(response.data))
        } catch (error) {
            alert('Ha habido un error. Contactese con el administrador')
        }
    }

    useEffect(() => {
        getPet()
    }, [route.params])

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
            <PetDetails navigation={navigation} pet={pet}></PetDetails>
            <TouchableOpacity
                style={[petDetailsStyle.floatButton, style.alignItems]}
                onPress={() => navigation.navigate('Perfil', pet.tutor)}
            >
                <Icon name='face' size={30} color='#fff'/>
                <Text style={{color: '#fff'}}> Contactar </Text>
            </TouchableOpacity>
        </View>
    )
}
