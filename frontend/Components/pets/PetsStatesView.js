import * as React from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import PetCard from "./card/PetCard.js";
import {petsStatesStyle} from "../../styles/PetStyle.js";

export default function PetsStatesView(props) {
    const [pets, setPets] = useState(props.pets)
    const [state, setState] = useState('Todos')
    const states = ['Todos', 'Perdido', 'Adopción', 'Transito']

    const filterState = buttonState => {
        setState(buttonState)
        return (buttonState !== 'Todos') ? props.pets.filter(function (pet){return pet.isThisState(buttonState)}) : props.pets
    }

    const statesButtons = (buttonState, index) => {
        return (
            <TouchableOpacity  key={index} activeOpacity={0.8} onPress={() =>  setPets(filterState(buttonState))}>
                <Text style={[petsStatesStyle.categoryText, state === buttonState && petsStatesStyle.categoryTextSelected]}>{buttonState}</Text>
            </TouchableOpacity>)
    }

    useEffect(() => {setPets(filterState(state))}, [props.pets])

    return (
        <View>
            <View style={petsStatesStyle.categoryContainer}>
                {states.map((propState, index) => statesButtons(propState, index))  }
            </View>
            <FlatList
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={petsStatesStyle.contentContainerStyle}
                numColumns={2}
                data={pets}
                renderItem={({item}) => {return <PetCard navigation={props.navigation} pet={item} />}}
            />
        </View>)
}
