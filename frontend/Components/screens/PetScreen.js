import React, {useEffect, useState} from 'react'
import {View, SafeAreaView, Text, Alert, ScrollView} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Pet from "../../model/Pet.js"
import PetsStatesView from "../pets/PetsStatesView.js"
import {Title} from "react-native-paper"
import {petCreationScreenStyle} from "../../styles/pet/PetCreationScreenStyle.js"
import {getSearchedPets} from "../../server/Api"
import {style} from "../../styles/Commons"
import PerfilButton from '../drawerlayout/PerfilButton.js'
<<<<<<< HEAD
import LostPets from "../modals/LostPets";
import AsyncStorage from "@react-native-async-storage/async-storage";
=======
import LostsPets from '../modals/LostsPets.js'
>>>>>>> 5f258fa2b6158f1a116679e9339c53be9d004791

export default function PetScreen({navigation}) {
    const [petsSearching, setPetsSearching] = useState([])
    const [isAlreadyShownAlert, setIsAlreadyShownAlert] = useState(false)
    let textInput = ''

    //searching pets in de database. Catching the error if fetch has a problem, showing an alert.
    const search = async query => {
        try {
            const response = await getSearchedPets(query)
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

    //[] means that useEffect runs in the first render.
    useEffect(() => {
        search('')
    }, [])
    return (
        <SafeAreaView style={[petCreationScreenStyle.safeAreaView, style.fullContainer]}>
            <View style={petCreationScreenStyle.header}>
                <View>
                    <Text style={petCreationScreenStyle.titleText}>
                        Mates4Ever
                    </Text>

                    <PerfilButton navigation={navigation}></PerfilButton>
                </View>
            </View>
            <View style={petCreationScreenStyle.searchView}>
                <View style={petCreationScreenStyle.searchContainer}>
                    <Icon name="search" size={25} style={petCreationScreenStyle.iconSearch}/>
                    <TextInput testID={'search'} placeholder="Search" style={petCreationScreenStyle.input}
                               ref={input => {
                                   textInput = input
                               }} onChangeText={search} clearButtonMode={"always"}/>
                    <Icon name="close" size={20} style={petCreationScreenStyle.iconClose} onPress={() => {
                        textInput.clear()
                        search('')

                    }}/>
                </View>
<<<<<<< HEAD
                <LostPets navigation={navigation} />
=======
            <LostsPets navigation={navigation} />
>>>>>>> 5f258fa2b6158f1a116679e9339c53be9d004791
            </View>
            <ScrollView horizontal={true}>
                {((petsSearching && petsSearching.length) ?
                    <PetsStatesView navigation={navigation} pets={petsSearching}/> :
                    <View><View style={petCreationScreenStyle.categoryContainer}
                                testID={'view-container-general'}><Title
                        testID={'no-pets'}>No hay mascotas</Title></View></View>)}
            </ScrollView>
        </SafeAreaView>
    )
}

