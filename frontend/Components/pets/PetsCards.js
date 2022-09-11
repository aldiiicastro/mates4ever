import * as React from 'react';
import {Title} from 'react-native-paper';
import PetsStatesView from "./PetsStatesView";

export default function PetsCards(props) {
    return (props.pets && props.pets.length) ? <PetsStatesView navigation={props.navigation} pets={props.pets}/> : <Title>No hay mascotas</Title>
}

