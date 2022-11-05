import {TouchableOpacity} from "react-native"
import {Image, Text, View} from "react-native"
import React from "react"
import {petCardStyle} from "../../../styles/pet/PetCardStyle";

export default function PetCard(props) {
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
                    <View style={pet.isLost() ? petCardStyle.viewStateLost : petCardStyle.viewState}>
                        <Text testID={`pet-state-${pet.id}`}
                              style={pet.isLost() ? petCardStyle.textStateLost : petCardStyle.textState}>
                            {pet.state}
                        </Text>
                    </View>
                </View>
                <Text testID={`pet-name-${pet.id}`} style={petCardStyle.textName}>
                    {pet.name}
                </Text>
                {pet.age ? <View style={petCardStyle.ageView}>
                    <Text testID={`pet-age-${pet.id}`} style={petCardStyle.textAge}>
                        Edad: {pet.age}
                    </Text>
                </View> : null }
            </View>
        </TouchableOpacity>
    )
}
