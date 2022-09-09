import {View} from "react-native";
import * as React from "react";
import PetsHorizontalView from "./PetsHorizontalView";

export default function PetsStatesView(props) {
    //Para mi es mejor hacer un filter, que 3 llamadas a la base.
    const lostPets = props.pets.filter(function (pet){ return pet.state === 'Perdido'})
    const adoptionPets = props.pets.filter(function (pet){ return pet.state === 'Adopción'})
    const transitPets = props.pets.filter(function (pet){ return pet.state === 'Transito'})
    return (<View>
            <PetsHorizontalView title={"Animales perdidos"} pets={lostPets}/>
            <PetsHorizontalView title={"Animales en adopción"} pets={adoptionPets}/>
            <PetsHorizontalView title={"Animales en transito"} pets={transitPets}/>
        </View>)
}

