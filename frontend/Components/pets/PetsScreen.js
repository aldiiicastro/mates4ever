import * as React from 'react'
import {Alert, ScrollView} from 'react-native'
import {useEffect, useState} from "react"
import {fetchSearch} from "../../server/Api"
import {Searchbar, Title} from "react-native-paper"
import PetsStatesView from "./PetsStatesView"
import Spinner from "react-native-loading-spinner-overlay"
import Pet from "../../model/Pet"

export default function Pets({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [petsSearching, setPetsSearching] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isAlreadyShownAlert, setIsAlreadyShownAlert] = useState(false)
    const search = async query => {
        setSearchQuery(query)
        setIsLoading(true)
        try {
            const response = await fetchSearch(query)
            const pets = []
            response.forEach((pet) => pets.push((new Pet(pet))))
            setPetsSearching(pets)
        } catch (error) {
            setPetsSearching([])
            isAlreadyShownAlert ?
(            Alert.alert(
                "Error",
                "Hubo un error al conectarse con la base. Por favor comuniquese con el administrador.",
                [{text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                        {text: "OK", onPress: () => console.log("OK Pressed")}])) : ''
            setIsAlreadyShownAlert(true)
        } finally {
            setIsLoading(false);
        }
    }

    //[] means that useEffect runs in the first render.
    useEffect(() => {search('')}, []);

    return (
        <React.Fragment>
            <Searchbar
                placeholder="Escribe aquí..."
               onChangeText={(text) => search(text)}
                onClear={() => search('')}
                loading={true}
                value={searchQuery}
                style={{margin: 5, borderRadius:10}}
                onSubmit={(text) => search(text)}
            />
            <ScrollView >
                {isLoading ? (
                    <Spinner
                    visible={isLoading}
                    textContent={'Cargando...'}
                />): ((petsSearching && petsSearching.length) ? <PetsStatesView navigation={navigation} pets={petsSearching} search={searchQuery}/> : <Title>No hay mascotas</Title>)}
            </ScrollView>
        </React.Fragment>)
}

