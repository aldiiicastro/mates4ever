import * as React from 'react';
import {ScrollView} from 'react-native';
import PetsCards from "./PetsCards";
import {useEffect, useState} from "react";
import {fetchPets, fetchSearch} from "../../server/Api";
import {Searchbar} from "react-native-paper";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
const K_OPTIONS = [
    {
        item: 'Nombre',
        id: 'NO',
    },
    {
        item: 'Edad',
        id: 'ED',
    },
    {
        item: 'Transito',
        id: 'ES1',
    },
    {
        item: 'Perdido',
        id: 'ES2',
    },
    {
        item: 'Adopción',
        id: 'ES3',
    },
    {
        item: 'Perro',
        id: 'TI1',
    },
    {
        item: 'Gato',
        id: 'TI2',
    },
    {
        item: 'Conejo',
        id: 'TI3',
    },
]

export default function Pets() {

    const [searchQuery, setSearchQuery] = useState('')
    const [pets, setPets] = useState(null)
    const [petsSearching, setPetsSearching] = useState(null)
    const [petsFilter, setPetsFilter]= useState(null)
    const [selectedTeams, setSelectedTeams] = useState([])
    const allPets = () => {fetchPets().then((response) => {setPets(response.data)})}
    const search = query => {
        setSearchQuery(query)
        fetchSearch(query).then((response) => {
            setPetsSearching(response.data)
        })
    }
    function onMultiChange() {
        return (item) => {
            setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
            const petFinder =pets.filter((pet) => (!petsSearching)? true : petsSearching.has(pet) )
            if (petFinder != null && item != null && item.id.includes('ES')) {
                setPetsFilter((petFinder.filter(function (pet){ return pet.state.includes(item.item)})))
            }
            if (petFinder != null && item != null && item.id.includes('NO')) {
                setPetsFilter((petFinder.filter(function (pet){ return pet.name.includes(item.item)})))
            }
            if (petFinder != null && item != null && item.id.includes('TI')) {
                console.log('entro')
                setPetsFilter((petFinder.filter(function (pet){ return pet.type.includes(item.item)})))
            }
            if (petFinder != null && item != null && item.id.includes('ED')) {
                setPetsFilter((petFinder.filter(function (pet){ return pet.age.includes(item.item)})))
            }
        }

    }

    function onChange() {
        return(item) => {
            setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
            setPetsFilter(null)}
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
            <SelectBox
                label="Select multiple"
                options={K_OPTIONS}
                style={{width: 300}}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={() => onChange()}
                isMulti
            />
            <ScrollView >
                { (() => {
                    if (!petsSearching && !petsFilter) { return  (<PetsCards pets={pets}/>)}
                    if(!petsFilter) {
                        return  (<PetsCards pets={petsSearching}/>)
                    }
                    return (<PetsCards pets={petsFilter}/>)

                }) () }
            </ScrollView>
        </React.Fragment>)
}

