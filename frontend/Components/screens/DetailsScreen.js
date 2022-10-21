import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import PetDetails from '../pets/details/PetDetails.js'
import {petDetails} from "../../styles/PetStyle.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {getPetById} from "../../server/Api.js"
import Pet from '../../model/Pet.js'

export default function DetailsScreen({navigation, route}) {
   const [pet, setPet] = useState({})

    useEffect(() => {
        getPetById(route.params).then((response) => {
            console.log(response.data)
            setPet(new Pet(response.data))
        }).catch((error) => console.log(error))
    }, [id])

    console.log("holasas",pet.tutor)
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
            <PetDetails navigation={navigation} pet={pet}></PetDetails>
            <TouchableOpacity
                style={[petDetails.floatButton]}
                onPress={() => navigation.navigate('Perfil', pet.tutor)}
            >
                <Icon name='add' size={30} color='#fff'/> 
                <Text> Contactar </Text>
            </TouchableOpacity>
        </View>
    )
}
