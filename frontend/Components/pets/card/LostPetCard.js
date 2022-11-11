import {TouchableOpacity} from "react-native"
import {Image, Text, View} from "react-native"
import React from "react"
import {petCardStyle} from "../../../styles/pet/PetCardStyle";

export default function LostPetCard(props) {
    const pet = props.pet
    return (
        <TouchableOpacity testID={`pet-details-${pet.id}`} activeOpacity={0.8}
                          onPress={() => props.navigation.navigate('Detalles', pet.id)}>
            <View style={petCardStyle.container}>
                <View style={petCardStyle.imageView}>
                    {pet.image ? 
                        <Image source={{uri: pet.image}} style={petCardStyle.image}/> 
                        :
                        <Image source={require('../../../assets/DefaultPet.png')} style={petCardStyle.image}/>
                    }
                </View>
                <Text testID={`pet-name-${pet.id}`} style={petCardStyle.textName}>
                    {pet.name} sdsax
                </Text>
                <Text testID={`pet-name-${pet.id}`} style={petCardStyle.textName}>
                    {pet.description} sdsax
                </Text>
            </View>
        </TouchableOpacity>
    )
}
