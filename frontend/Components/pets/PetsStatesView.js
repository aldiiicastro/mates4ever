import {View} from "react-native";
import * as React from "react";
import PetsHorizontalView from "./PetsHorizontalView";

export default function PetsStatesView(props) {
    const filterState = state => {
        return props.pets.filter(function (pet){return pet.isThisState(state)})
    }
    const horizontalView = state => {
        return <PetsHorizontalView navigation={props.navigation} title={"Animales " + state} pets={filterState(state)}/>
    }
    return (<View>
            <PetsHorizontalView navigation={props.navigation} title={"Animales perdidos"} pets={filterState("Perdido")}/>
            <PetsHorizontalView navigation={props.navigation} title={"Animales en adopción"} pets={filterState("Adopción")}/>
            <PetsHorizontalView navigation={props.navigation} title={"Animales en transito"} pets={filterState("Transito")}/>
        </View>)
}

