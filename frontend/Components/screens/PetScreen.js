import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, Alert, ScrollView} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Pet from "../../model/Pet.js"
import PetsStatesView from "../pets/PetsStatesView.js"
import {Title} from "react-native-paper"
import {petScreenStyle} from "../../styles/PetScreenStyle.js";
import {fetchSearch} from "../../server/Api";

export default function PetScreen({navigation}) {
    const [petsSearching, setPetsSearching] = useState([])
    const [isAlreadyShownAlert, setIsAlreadyShownAlert] = useState(false)
    let textInput = ''

    //searching pets in de database. Catching the error if fetch has a problem, showing an alert.
    const search = async query => {
        try {
            fetchSearch(query).then(response => {
                console.log(response)
                const pets = []
                response.data.forEach((pet) => pets.push((new Pet(pet))))
                setPetsSearching(pets)
            })
        } catch (error) {
            setPetsSearching([])
            isAlreadyShownAlert ?
                (            Alert.alert(
                    "Error",
                    "Hubo un error al conectarse con la base. Por favor comuniquese con el administrador.",
                    [{text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel"},
                        {text: "OK", onPress: () => console.log("OK Pressed")}])) : ''
            setIsAlreadyShownAlert(true)
        }
    }
    //[] means that useEffect runs in the first render.
    useEffect(() => {search('')}, []);
    return (
            <SafeAreaView style={petScreenStyle.safeAreaView}>
                <View style={petScreenStyle.header}>
                    <View>
                        <Text style={[petScreenStyle.titleText]}>
                            Mates4Ever
                        </Text>
                    </View>
                </View>
                <View style={petScreenStyle.searchView}>
                    <View style={petScreenStyle.searchContainer}>
                        <Icon name="search" size={25} style={petScreenStyle.iconSearch}/>
                        <TextInput testID={'search'} placeholder="Search" style={petScreenStyle.input} ref={input => { textInput = input}} onChangeText={search} clearButtonMode={"always"}/>
                        <Icon name="close" size={20} style={petScreenStyle.iconClose} onPress={( ) => {
                            textInput.clear()
                            search('')
                            navigation.navigate('Perfil')
                        }}/>
                    </View>
                    <View style={petScreenStyle.sortBtn}>
                        <Icon name="sort" size={30} style={petScreenStyle.iconSrt} onPress={() => navigation.navigate('Perfil')}/>
                    </View>
                </View>
            <ScrollView horizontal={true} >
                {((petsSearching && petsSearching.length) ? <PetsStatesView navigation={navigation} pets={petsSearching}/> :
                    <View><View style={petScreenStyle.categoryContainer} testID={'view-container-general'}><Title testID={'no-pets'}>No hay mascotas</Title></View></View>)}
            </ScrollView>
        </SafeAreaView>
    );
};
