import {View, Text, Modal, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getNearByPets} from '../../server/Api';
import Pet from '../../model/Pet';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {lostPetsStyle} from "../../styles/LostPetsStyle";
import { Button } from 'react-native-paper';


export default function MapLostPets({modalVisible, setModalVisible, navigation}) {
    const [pets, setPets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAlreadyShownAlert, setIsAlreadyShownAlert] = useState(false)
    const [currentLocation, setCurrentLocation] = useState({
        latitude: -34.706527,
        longitude: -58.277439,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    })

    useEffect(() => {
        getCurrentPosition().then( () => setIsLoading(false) )
    }, [])

    useEffect(() => {
        if (! isLoading ) {
            nearbyPets()
        }
    }, [currentLocation, isLoading])

    const nearbyPets = async () => {
        try {
            const response = await getNearByPets(currentLocation.latitude, currentLocation.longitude)
            const nearby = response.data.map((pet) => (new Pet(pet)))
            setPets(nearby)
        } catch (error) {
            setPets([])
            isAlreadyShownAlert ?
                (Alert.alert(
                    "Error",
                    "Hubo un error al conectarse con la base. Por favor comuniquese con el administrador.",
                    [{text: "OK", onPress: () => console.log("OK Pressed")}])) : ''
            setIsAlreadyShownAlert(true)
        }
    }

    const getCurrentPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync();
         let coords = location["coords"]
        setCurrentLocation({
            latitude: coords ?coords.latitude : -34.706527,
            longitude: coords ?coords.longitude : -58.277439,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015
        })
        return location
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={lostPetsStyle.centeredView}>
                    <View style={lostPetsStyle.modalView}>
                        <View style={lostPetsStyle.modalTitle}>
                            <Text style={lostPetsStyle.modalText}>Animales perdidos en tu zona</Text>
                            <Icon
                                name="close" size={30} style={lostPetsStyle.iconHideModal}
                                onPress={() => setModalVisible(false)}
                                testID={'hideModal'}
                            />
                        </View>

                        <MapView
                            style={lostPetsStyle.mapViewStyle}
                            initialRegion={currentLocation}
                            region={currentLocation}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            zoomControlEnabled={true}
                        >

                            {pets.map((pet, index) =>
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: pet.coordinates.latitude,
                                        longitude: pet.coordinates.longitude
                                    }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        navigation.navigate('Detalles', pet.id)
                                    }}
                                />

                            )}
                        </MapView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

