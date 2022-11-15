import * as React from 'react'
import { useRef } from "react"
import { View, Image, Text, ScrollView } from 'react-native'
import ViewShot from "react-native-view-shot"
import * as Sharing from 'expo-sharing'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tag from '../../drawerlayout/Tag.js'
import { style } from "../../../styles/Commons.js"
import { petDetailsStyle } from "../../../styles/pet/PetDetailsStyle"
import MapView, { Circle, Marker } from 'react-native-maps'

export default function PetDetails({ navigation, pet }) {
    const viewShot = useRef()
    const share = async () => {
        try {
            const uri = await viewShot.current.capture()
            let options = {
                mimeType: 'image/jpeg',
                dialogTitle: 'Share Title',
            }
            await Sharing.shareAsync(uri, options)
        } catch (err) {
            alert('No se ha podido compartir. Intentelo más tarde')
        }
    }

    return (
        <ScrollView vertical style={{ backgroundColor: "#fff", width: "100%" }}>
            <Icon name="arrow-back" size={25} style={{ marginLeft: 20, marginTop: 15 }}
                onPress={() => navigation.goBack()} />
            <ViewShot
                ref={viewShot}
                options={{ format: 'jpg', quality: 0.9 }}>
                <View style={petDetailsStyle.imageContainer}>
                    <Image
                        source={pet.image ? { uri: pet.image } : require('../../../assets/DefaultPet.png')}
                        style={petDetailsStyle.imageDetail} />
                </View>
                <View style={petDetailsStyle.detailsContainer}>
                    <View
                        style={{
                            marginLeft: 20,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                        }}>
                        <Text testID={"pet-details-name"} style={{ fontSize: 30, fontWeight: 'bold' }}>{pet.name}</Text>
                    </View>
                    <View
                        style={{
                            marginLeft: 20,
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View testID={"pet-details-age"}
                            style={style.alignItems}>
                            <Text style={[style.bold, { fontSize: 18 }]}>Edad: </Text>
                            <Text
                                style={{ fontSize: 18 }}> {pet.age ? pet.age : "No especifica"}</Text>
                        </View>
                        <Tag value={pet.state} />
                    </View>
                    {pet.type &&
                        <View testID={"pet-details-type"}
                            style={[style.alignItems, { marginLeft: 15 }]}>
                            <Text style={[style.bold, { fontSize: 18 }]}> Tipo: </Text>
                            <Text style={{ fontSize: 18 }}> {pet.type}</Text>
                        </View>
                    }

                    {pet.breed &&
                        <View testID={"pet-details-breed"}
                            style={[style.alignItems, { marginLeft: 15 }]}>
                            <Text style={[style.bold, { fontSize: 18 }]}> Raza: </Text>
                            <Text style={{ fontSize: 18 }}> {pet.breed}</Text>
                        </View>
                    }

                    <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                        <Text testID={"pet-details-description-field"}
                            style={{ fontSize: 20, fontWeight: 'bold' }}>Descripción</Text>
                        <Text
                            testID={"pet-details-description"}
                            style={petDetailsStyle.descriptionDetail}>
                            {pet.description ? pet.description : "-"}
                        </Text>

                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                        <Text testID={"pet-details-description-field"}
                            style={{ fontSize: 20, fontWeight: 'bold' }}>Historial medico</Text>
                        <Text
                            testID={"pet-details-description"}
                            style={petDetailsStyle.descriptionDetail}>
                            {pet.medicalHistory ? pet.medicalHistory : "-"}
                        </Text>
                        <Text testID={"pet-details-castrated"}
                            style={[petDetailsStyle.descriptionDetail, style.bold]}> • {pet.castrated ? "Esta castrado" : "No esta castrado"}</Text>
                        <Text testID={"pet-details-vaccinate"}
                            style={[petDetailsStyle.descriptionDetail, style.bold]}> • {pet.vaccine ? "Esta vacunado" : "No esta vacunado"}</Text>
                    </View>

                    {pet.coordinates &&
                        <MapView
                            style={{ marginHorizontal: 10, marginTop: 30, height: 200 }}
                            initialRegion={{
                                latitude: pet.coordinates.latitude,
                                longitude: pet.coordinates.longitude,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                            showsUserLocation={true} >

                            <Marker coordinate={pet.coordinates} />
                            <Circle center={pet.coordinates} radius={1000} />
                        </MapView>}
                </View>
            </ViewShot>
            <View>
                <View>
                    <Icon
                        style={{ marginLeft: 20, marginTop: 15 }}
                        name={"share"}
                        size={25}
                        onPress={share}
                        title="Share Image"
                    />
                </View>
            </View>
        </ScrollView>
    )
}


