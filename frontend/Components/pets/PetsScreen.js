import * as React from 'react';
import {ScrollView} from 'react-native';
import {useEffect, useState} from "react";
import {fetchSearch} from "../../server/Api";
import {Searchbar, Title} from "react-native-paper";
import PetsStatesView from "./PetsStatesView";

export default function Pets({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [petsSearching, setPetsSearching] = useState(null)
    const search = query => {
        setSearchQuery(query)
        fetchSearch(query).then((response) => {
            setPetsSearching(response)
        })
    }

    useEffect(() => {search('')}, []);

    return (
        <React.Fragment>
            <Searchbar
                placeholder="Escribe aquí..."
                onChangeText={(text) => search(text)}
                onClear={(text) => search('')}
                value={searchQuery}
            />
            <ScrollView >
                {(petsSearching && petsSearching.length) ? <PetsStatesView navigation={navigation} pets={petsSearching} search={searchQuery}/> : <Title>No hay mascotas</Title>}
            </ScrollView>
        </React.Fragment>)
}

