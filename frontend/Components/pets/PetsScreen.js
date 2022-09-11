import * as React from 'react';
import {ScrollView} from 'react-native';
import PetsCards from "./PetsCards";
import {useEffect, useState} from "react";
import {fetchPets, fetchSearch} from "../../server/Api";
import {Searchbar} from "react-native-paper";

export default function Pets({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [pets, setPets] = useState(null)
    const [petsSearching, setPetsSearching] = useState(null)
    const allPets = () => {fetchPets().then((response) => {setPets(response.data)})}
    const search = query => {
        setSearchQuery(query)
        fetchSearch(query).then((response) => {
            setPetsSearching(response.data)
        })
    }

    useEffect(() => {allPets()}, []);

    return (
        <React.Fragment>
            <Searchbar
                placeholder="Escribe aquí..."
                onChangeText={(text) => search(text)}
                onClear={(text) => search('')}
                value={searchQuery}
            />
            <ScrollView >
                    { (!petsSearching ) ?  <PetsCards navigation={navigation} pets={pets}/>:<PetsCards navigation={navigation} pets={petsSearching}></PetsCards> }
            </ScrollView>
        </React.Fragment>)
}

