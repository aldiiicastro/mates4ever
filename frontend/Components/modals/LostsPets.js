import { View, Text, Modal, StyleSheet, Pressable, ScrollView, Dimensions, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getSearchedPets } from '../../server/Api';
import Pet from '../../model/Pet';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function LostsPets({navigation}) {
    const [modalVisible, setModalVisible] = useState(true);
    const [petsSearching, setPetsSearching] = useState([])
    const [isAlreadyShownAlert, setIsAlreadyShownAlert] = useState(false)
    const [currentLocation, setCurrentLocation] = useState(false)

    useEffect(() => {
        search('')
        getCurrentPosition()
    }, [])

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

    const getCurrentPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setCurrentLocation({
            latitude: location["coords"].latitude,
            longitude: location["coords"].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1 })
    }

    return (
        <View>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>Animales perdidos en tu zona</Text>
                    <MapView
                        style={{width: "100%", height: 100}}
                        initialRegion={currentLocation}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        zoomControlEnabled={true}

                    >
                        { petsSearching.map(pet =>
                            pet.coordinates != null && pet.coordinates.latitude ?
                                <Marker
                                    coordinate={pet.coordinates}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        navigation.navigate('Detalles', pet.id)}
                                    }
                                    />
                                // console.log()
                                : null
                        )}

                    </MapView>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
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
        marginTop: 22
    },
    modalView: {
        width: Dimensions.get('window').width -40,
        height: Dimensions.get('window').height -80,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
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
        marginBottom: 15,
        textAlign: "center"
    }
  });
  