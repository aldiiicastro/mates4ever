import {TouchableOpacity} from "react-native";
import {Image, Text, View} from "react-native";
import React from "react";
import {petCardStyleExample} from "../../../styles/PetStyle.js";

export default function PetCardEjemplo(props) {
    const pet = props.pet
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate('Detalles', pet.id)}>
            <View style={petCardStyleExample.container}>
                <View style={petCardStyleExample.imageView}>
                    <Image source={{uri: pet.image}} style={petCardStyleExample.image}/>
                    <View style={pet.isLost() ? petCardStyleExample.viewStateLost : petCardStyleExample.viewState}>
                        <Text style={pet.isLost() ? petCardStyleExample.textStateLost : petCardStyleExample.textState}>
                            {pet.state}
                        </Text>
                    </View>
                    
                </View>
                <Text style={petCardStyleExample.textName}>
                    {pet.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
