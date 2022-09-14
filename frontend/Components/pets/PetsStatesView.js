import * as React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Title} from "react-native-paper";
import {useEffect, useState} from "react";
import {groupBy} from "lodash";
import {petCardStyle} from "./styles/PetCardStyles";
import {buttonStyles} from "./styles/ButtonsStyles";
import PetCard from "./PetCard";

export default function PetsStatesView(props) {
    const [pets, setPets] = useState(props.pets)
    const [state, setState] = useState('Todos')
    const states = Object.keys(groupBy(props.pets, 'state'))
    const filterState = state => {
        setState(state)
        return props.pets.filter(function (pet){return pet.isThisState(state)})
    }
    useEffect(() => {setPets(props.pets)}, [props.pets])
    const statesButtons = (buttonState, index) => {
        return ((state !== buttonState) ?
            <TouchableOpacity  key={index} style ={buttonStyles.buttonStyle} onPress={() =>  setPets(filterState(buttonState))}>
                <Text style={{color: 'white', fontSize: 15}}>{buttonState}</Text>
            </TouchableOpacity>
            : <Title key={index}/>)
    }

    const allPetsButton = () => {
        return ((state !== 'Todos') ?
            <TouchableOpacity style ={buttonStyles.buttonStyle}  onPress={() => {
                setPets(props.pets)
                setState('Todos')
            }}>
                <Text style={{color: 'white', fontSize: 15}}>Todos</Text>
            </TouchableOpacity>: <Title/> )
    }
    return (
        <View>
            <View style={buttonStyles.buttonStyleContainer}>
                {allPetsButton()}
                {states.map((propState, index) => statesButtons(propState, index))  }
            </View>
            <View>
                {(pets.length) ?  <Title style={petCardStyle.card_title}>{state}</Title> : <Title/>}
                <PetCard navigation={props.navigation} pets={pets}></PetCard>
            </View>
        </View>)
}

