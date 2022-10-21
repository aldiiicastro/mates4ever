import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import PetDetails from '../pets/details/PetDetails.js'
import {petDetails} from "../../styles/PetStyle.js"
import {style} from "../../styles/Commons.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getPetById} from "../../server/Api.js"
import Pet from '../../model/Pet.js'

export default function DetailsScreen({navigation, route}) {
   const [pet, setPet] = useState({})

    useEffect(() => {
        getPetById(route.params).then((response) => {
            setPet(new Pet(response.data))
        }).catch((error) => console.log(error))
    }, [route.params])

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
            <PetDetails navigation={navigation} pet={pet}></PetDetails>
            <TouchableOpacity
                style={[petDetails.floatButton, style.alignItems]}
                onPress={() => navigation.navigate('Perfil', pet.tutor)}
            >
                <Icon name='face' size={30} color='#fff'/> 
                <Text style={{color: '#fff'}}> Contactar </Text>
            </TouchableOpacity>
        </View>
    )
}
