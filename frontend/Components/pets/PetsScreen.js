import * as React from 'react';
import {Alert, ScrollView} from 'react-native';
import {useEffect, useState} from "react";
import {fetchSearch} from "../../server/Api";
import {Searchbar, Title} from "react-native-paper";
import PetsStatesView from "./PetsStatesView";
import Pet from "../../model/Pet";

export default function Pets({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [petsSearching, setPetsSearching] = useState(null)
    const search = query => {
        setSearchQuery(query)
        fetchSearch(query).then((response) => {
            if (response.status !== 200) {
                throw new Error('Algo salio mal')
            }
            const pets = []
            response.data.forEach((pet) => pets.push((new Pet(pet))))
            setPetsSearching(pets)
        }).catch((error)=> console.log(error))
    }

    useEffect(() => {search('')}, []);

    return (
        <React.Fragment>
            <Searchbar
                placeholder="Escribe aquí..."
                onChangeText={(text) => search(text)}
                onClear={() => search('')}
                value={searchQuery}
            />
            <ScrollView >
                {(petsSearching && petsSearching.length) ? <PetsStatesView navigation={navigation} pets={petsSearching} search={searchQuery}/> : <Title>No hay mascotas</Title>}
            </ScrollView>
        </React.Fragment>)
}

