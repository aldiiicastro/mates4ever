import React, {useEffect, useState} from 'react'
import {View, SafeAreaView, Text, Alert, ScrollView, Modal} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Pet from "../../model/Pet.js"
import PetsStatesView from "../pets/PetsStatesView.js"
import {Button, Divider, Menu, Modal as Modal2, Portal, Provider, Title} from "react-native-paper"
import {petCreationScreenStyle} from "../../styles/pet/PetCreationScreenStyle.js"
import {getSearchedPets} from "../../server/Api"
import {style} from "../../styles/Commons"
import { SimpleCheckBox, SlideCondicionalCheker } from '../drawerlayout/FormItemGeneric.js'
import { getCurrentPosition } from '../../server/LocationServer.js'
import { lostPetsStyle } from '../../styles/LostPetsStyle.js'
import { filterStyle } from '../../styles/FilterStyle.js'

export default function PetScreen({navigation}) {
    const [petsSearching, setPetsSearching] = useState([])
    const [actualCoordinates, setActualCoordinetes] = useState()
    const [typeFilter, setTypeFilter] = useState([])
    const [stateFilter, setStateFilter] = useState([])
    const [closenessFilter, setClosenessFilter] = useState(false)
    const [closeness, setCloseness] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isAlreadyShownAlert, setIsAlreadyShownAlert] = useState(false)
    const [query, setQuery] = useState('')

    //searching pets in de database. Catching the error if fetch has a problem, showing an alert.
    const search = async () => {
        try {
            const response = await getSearchedPets(query, typeFilter,"",stateFilter)
            const pets = response.data.map((pet) => (new Pet(pet)))
            setPetsSearching(pets)
        } catch (error) {
            setPetsSearching([])
            isAlreadyShownAlert ?
                (Alert.alert(
                    "Error",
                    "Hubo un error al conectarse con la base. Por favor comuniquese con el administrador.",
                    [{text: "OK", onPress: () => console.log("OK Pressed")}])) : ''
            setIsAlreadyShownAlert(true)
        }
    }
    const changeTypeFilter = (type) => {
        if (typeFilter.includes(type)){
            setTypeFilter(typeFilter.filter( t=> t != type ))
        }else{
            setTypeFilter([...typeFilter, type])
        }
    }

    const changeStateFilter = (status) => {
        if (stateFilter.includes(status)){
            setStateFilter(stateFilter.filter( t=> t != status ))
        }else{
            setStateFilter([...stateFilter, status])
        }
    }

    const getCoordinates = () => {
        if(closenessFilter){
           return [closeness*0.01, actualCoordinates["latitude"], actualCoordinates["longitude"]]
        }else{
            return ""
        }
    }
    const getActualCoordinates = async () => {
        let location = await getCurrentPosition()
        setActualCoordinetes({"km" : 0,  "latitude": location["latitude"], "longitude": location["longitude"]})
    }

    const searchByFilters = async (search) => {
        const response = await getSearchedPets( search != null? search : query,typeFilter,getCoordinates(),stateFilter)
        const pets = response.data.map((pet) => (new Pet(pet)))
        setPetsSearching(pets)
        setIsExpanded(false)

    }

    const clearFilters = () => {
        console.log("cdz")
        setTypeFilter("")
        setCloseness(0)
        setClosenessFilter(false)
        setStateFilter("")
    }

    const searchPets = (search) => {
        console.log("hola",search)
        clearFilters()
        searchByFilters(search)
    };
    //[] means that useEffect runs in the first render.
    useEffect(() => {
        search('')
        getActualCoordinates()
    }, [])
    return (
        <SafeAreaView 
            style={[petCreationScreenStyle.safeAreaView, style.fullContainer]}

        >
            <View style={petCreationScreenStyle.searchView}>
                <View style={petCreationScreenStyle.searchContainer}>
                    <Icon name="search" size={25} style={petCreationScreenStyle.iconSearch}/>
                    <TextInput 
                        testID={'search'}
                        placeholder="Search"
                        style={petCreationScreenStyle.input}
                        value={query}
                        onChangeText={setQuery}
                        clearButtonMode={"always"}
                    />
                    <Icon name="close" size={20} style={petCreationScreenStyle.iconClose} onPress={() => {
                        setQuery("");
                        searchPets("");
                    }}/>
                </View>
                <View style={lostPetsStyle.sortBtn}>
                    <Icon name="search" size={30} style={lostPetsStyle.iconSrt} onPress={() => searchPets()} />
                </View>
            </View>
                <Portal>
                    <Modal
                        transparent={true}
                        visible={isExpanded} 
                        style={{width:100}}
                        onDismiss={() => { setIsExpanded(false)}}
                    >
                        <Modal2
                            visible={isExpanded} 
                            onDismiss={() => { setIsExpanded(false)}}
                            ></Modal2>
                        <View
                            style={filterStyle.rightView}
                        >
                            <View style={[filterStyle.filterModal]}>
                                <Text style={filterStyle.title}>Filtrar por:</Text>
                                <Divider style={filterStyle.principalDivider} />
                                <ScrollView>
                                    <View style={filterStyle.categoryView}>
                                        <Text style={filterStyle.categoryTitle}>Tipo de animal:</Text>
                                        {['Perro', 'Gato', 'Conejo'].map( (type) => 
                                            <SimpleCheckBox
                                                status={typeFilter.includes(type) ? "checked" : "unchecked"}
                                                onPress={() => {
                                                    changeTypeFilter(type)
                                                }}
                                                text={type}
                                            />
                                        )}
                                    </View>

                                    <Divider style={filterStyle.secondaryDivider}/>
                                    <View style={filterStyle.categoryView}>
                                        <Text style={filterStyle.categoryTitle}>Estado de la publicación:</Text>
                                        {['Transito', 'Adopción', 'Perdido'].map( (status) => 
                                            <SimpleCheckBox
                                                status={stateFilter.includes(status) ? "checked" : "unchecked"}
                                                onPress={() => {
                                                    changeStateFilter(status)
                                                }}
                                                text={status}
                                            />
                                        )}

                                    </View>

                                    <Divider style={filterStyle.secondaryDivider}/>
                                    <View style={filterStyle.categoryView}>
                                        <Text style={filterStyle.categoryTitle}>Por cercania:</Text>
                                        <SlideCondicionalCheker
                                            status={closenessFilter ? "checked" : "unchecked"}
                                            onPress={() => { setClosenessFilter(!closenessFilter) }}
                                            text={"Buscar por cercania"}
                                            valueText = {closeness + " km"}
                                            minimumValue={0}
                                            maximumValue={10}
                                            step={0.5}
                                            disabled={!closenessFilter}
                                            onValueChange= { (value) => setCloseness(value) }
                                        />
                                    </View>

                                    <Divider style={filterStyle.secondaryDivider}/>
                                    <View style={filterStyle.categoryView}>
                                        <Button
                                            onPress={searchByFilters}
                                            mode="contained"
                                            color="#841584"
                                        >Buscar</Button>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </Portal>
                <View style={filterStyle.buttonsFilter}>
                    <Button
                        onPress={ () => { setIsExpanded(true)} }
                        mode="text"
                        icon={"filter"}
                        contentStyle={{flexDirection: 'row-reverse'}}
                        >Filtros </Button>
                </View>
                <ScrollView horizontal={true}>
                    {((petsSearching && petsSearching.length) ?
                        <PetsStatesView navigation={navigation} pets={petsSearching}/> :
                        <View>
                            <View style={petCreationScreenStyle.categoryContainer}
                                    testID={'view-container-general'}>
                                <Title testID={'no-pets'}>No hay mascotas</Title>
                            </View>
                        </View>
                    )}
                </ScrollView>
        </SafeAreaView>
    )
}