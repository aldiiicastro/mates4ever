import * as React from 'react'
import {useEffect, useRef, useState} from "react"
import {View, Image, Text, Pressable, FlatList, TouchableHighlight, Alert} from 'react-native'
import ViewShot from "react-native-view-shot"
import * as Sharing from 'expo-sharing'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tag from '../../drawerlayout/Tag.js'
import {deletePetById, getComments} from "../../../server/Api";
import CommentCard from "../../comments/CommentCard";
import SavedMapView from "../../SavedMapView";
import {petDetailsStyle} from "../../../styles/pet/PetDetailsStyle";
import {style} from "../../../styles/Commons"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PetDetails({navigation, pet}) {
    const [comments, setComments] = useState([])
    const [email, setEmail] = useState('')
    useEffect(() => {
        getAllComments(pet.id)
    })

    const getAllComments = async (petID) => {
        setEmail(await AsyncStorage.getItem('user_id'))
        try {
            const commentsSaved = await getComments(petID)
            setComments(commentsSaved.data)
        } catch (e) {
            console.log(e)
        }
    }
    const deletePet = async () => {
        try {
            await deletePetById(pet.id)
            navigation.replace("Inicio")
        } catch (e) {
            console.log(e)
            alert("Ha habido un error. Contactese con el administrador")
        }
    }
    const publishFinish = async () => {
        Alert.alert(
            "BORRAR PUBLICACIÓN",
            "¿Estas seguro que deseas finalizarla?",
            [{text: "Si", onPress: async () => deletePet()}, {
                text: "No",
                onPress: () => navigation.navigate("Detalles", pet.id)
            }])
    }
    const viewShot = useRef()
    const share = async () => {
        try {
            const uri = await viewShot.current.capture()
            let options = {
                mimeType: 'image/jpeg', dialogTitle: 'Share Title',
            }
            await Sharing.shareAsync(uri, options)
        } catch (err) {
            alert('No se ha podido compartir. Intentelo más tarde')
        }
    }

    const createComment = () => {
        navigation.navigate('Comentar', pet)
    }

    const renderGoBack = () => {
        return (
            <Icon name="arrow-back" size={25} style={{marginLeft: 20, marginTop: 15}}
                  onPress={() => navigation.goBack()}/>
        )
    }
    const renderImage = () => {
        return (<View style={petDetailsStyle.imageContainer}>
            <Image
                source={pet.image ? {uri: pet.image} : require('../../../assets/DefaultPet.png')}
                style={petDetailsStyle.imageDetail}/>
        </View>)
    }
    const renderFinish = () => {
        return pet.tutor === email ?
            <View>
                <Pressable style={[petDetailsStyle.button, petDetailsStyle.finish]} testID={'hideModal'}
                           onPress={() => publishFinish()}>
                    <Text style={petDetailsStyle.textStyle}>Finalizar</Text>
                </Pressable>
            </View> : <View/>
    }
    const renderComponent = () => {
        return (
            <ViewShot ref={viewShot} options={{format: 'jpg', quality: 0.9}}>
                {renderImage()}
                <View style={petDetailsStyle.detailsContainer}>
                    <View style={{marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end',}}>
                        <Text testID={"pet-details-name"}
                              style={{fontSize: 30, fontWeight: 'bold'}}>{pet.name}</Text>
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
                            <Text style={[style.bold, {fontSize: 18}]}>Edad: </Text>
                            <Text
                                style={{fontSize: 18}}> {pet.age ? pet.age : "No especifica"}</Text>
                        </View>
                        <Tag value={pet.state}/>
                    </View>
                    {pet.type && <View testID={"pet-details-type"}
                                       style={[style.alignItems, {marginLeft: 15}]}>
                        <Text style={[style.bold, {fontSize: 18}]}> Tipo: </Text>
                        <Text style={{fontSize: 18}}> {pet.type}</Text>
                    </View>}

                    {pet.breed && <View testID={"pet-details-breed"}
                                        style={[style.alignItems, {marginLeft: 15}]}>
                        <Text style={[style.bold, {fontSize: 18}]}> Raza: </Text>
                        <Text style={{fontSize: 18}}> {pet.breed}</Text>
                    </View>}

                    <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                        <Text testID={"pet-details-description-field"}
                              style={{fontSize: 20, fontWeight: 'bold'}}>Descripción</Text>
                        <Text
                            testID={"pet-details-description"}
                            style={petDetailsStyle.descriptionDetail}>
                            {pet.description ? pet.description : "-"}
                        </Text>

                    </View>

                    <View style={{paddingHorizontal: 20, marginTop: 10}}>
                        <Text testID={"pet-details-description-field"}
                              style={{fontSize: 20, fontWeight: 'bold'}}>Historial medico</Text>
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
                    {renderFinish()}
                    {pet.coordinates && <SavedMapView param={pet}/>}
                </View>
                {comments.length > 0 && <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                    <Text testID={"pet-details-description-field"}
                          style={{fontSize: 20, fontWeight: 'bold'}}>Comentarios</Text>
                </View>}
            </ViewShot>
        )
    }

    const renderFooter = () => {
        return (
            <View>
                <Icon
                    style={{marginLeft: 20, marginTop: 15}}
                    name={"share"}
                    size={35}
                    onPress={share}
                    title="Share Image"
                />
                <View style={petDetailsStyle.centeredView}>
                    <View style={petDetailsStyle.modalView}>
                        <Pressable style={[petDetailsStyle.button, petDetailsStyle.buttonClose]} testID={'hideModal'}
                                   onPress={() => createComment()}>
                            <Text style={petDetailsStyle.textStyle}>Comentar</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        )
    }
    const renderWithComments = () => {
        return (
            <View>
                <FlatList
                    data={comments}
                    renderItem={({item}) => {
                        return <CommentCard comment={item}/>
                    }}
                    ListHeaderComponent={renderComponent()}
                    ListFooterComponent={renderFooter()}
                />
            </View>
        )
    }

    return (
        <View>
            {renderGoBack()}
            {comments ? renderWithComments() : <View>{renderComponent()} {renderFooter()} </View>}
        </View>
    )
}

