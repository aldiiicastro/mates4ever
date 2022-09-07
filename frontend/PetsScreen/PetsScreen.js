import * as React from 'react';
import {ScrollView} from 'react-native';
import PetCard from "./PetCard";
import {useEffect, useState} from "react";
import {fetchPets, fetchSearch} from "../server/Api";
import {Searchbar} from "react-native-paper";

export default function Pets() {
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
        <ScrollView>
            <Searchbar
                placeholder="Type Here..."
                onChangeText={(text) => search(text)}
                onClear={(text) => search('')}
                value={searchQuery}
            />
            { (!petsSearching ) ?  <PetCard pets={pets}/>:<PetCard pets={petsSearching}></PetCard> }
        </ScrollView>
    )
}

