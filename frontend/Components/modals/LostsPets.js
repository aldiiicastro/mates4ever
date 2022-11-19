import {View, Text, Modal, StyleSheet, Pressable, Dimensions, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getNearByPets, getSearchedPets} from '../../server/Api';
import Pet from '../../model/Pet';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { petCreationScreenStyle } from '../../styles/pet/PetCreationScreenStyle';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../styles/Colors';


export default function LostsPets({navigation}) {
    const [modalVisible, setModalVisible] = useState(true);
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
        setCurrentLocation({
            latitude: location["coords"].latitude,
            longitude: location["coords"].longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015
        })
        return location
    }

    return (
        <View>
            <View style={petCreationScreenStyle.sortBtn}>
                <Icon name="place" size={30} style={petCreationScreenStyle.iconSrt} onPress={() => setModalVisible(true)} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={styles.modalText}>Animales perdidos en tu zona</Text>
                            <Icon
                                name="close" size={30} style={{ color: colors.grey }}
                                onPress={() => setModalVisible(false)}
                                testID={'hideModal'}
                            />
                        </View>

                        <MapView
                            style={{width: "100%", height: "90%"}}
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
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height - 40,
        backgroundColor: "white",
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.violet,
    }
});
