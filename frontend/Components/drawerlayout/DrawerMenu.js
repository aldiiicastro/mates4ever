import * as React from 'react'
import {Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"
import { colors } from '../../styles/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapLostPets from '../map/MapLostPets'
import { Button } from 'react-native-paper'

export default function DrawerMenu ({navigation}) {
    const [showMenu, setShowMenu] = React.useState(false)
    const [email, setEmail] = React.useState({})
    const [mapModalVisible, setMapModalVisible] = React.useState(false);

    const getUserEmail = async () => {
        setEmail(await AsyncStorage.getItem('user_id'))
    }
    React.useEffect( () => { getUserEmail() }, [])

    const showModalMap = (value) => {
        setShowMenu(false)
        setMapModalVisible(value)
    }

    return (
        <View>
            <Icon
                name="menu"
                size={35}
                onPress={() => {setShowMenu(!showMenu); console.log("hola")}}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={showMenu}
                onRequestClose={ () => { setShowMenu(!showMenu) }}
            >
                <TouchableOpacity
                    style={{width:"100%", height:"100%"}} 
                    activeOpacity={1} 
                    onPressOut={() => {  setShowMenu(!showMenu) }}
                >
                    <ScrollView
                    directionalLockEnabled={true} 
                    >
                    <TouchableWithoutFeedback >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.profileButton} onPress={() => {setShowMenu(!showMenu); navigation.navigate('Perfil', email)}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',}}>
                                    <Icon 
                                        name='person'
                                        size={60}
                                        color={colors.violet}
                                    />
                                    <Text style={styles.textProfile}>Perfil</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={() => showModalMap(!mapModalVisible)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',}}>
                                    <View>
                                        <Icon 
                                                name='map'
                                                size={35}
                                                color={colors.grey}
                                            />
                                    </View>
                                    <Text style={styles.modalText}>Animales perdidos cercanos</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
            </Modal>
            <MapLostPets modalVisible={mapModalVisible} setModalVisible={showModalMap}/>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        width: Dimensions.get("window").width -100,
    },
    modalView: {
        height: Dimensions.get("window").height,
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
        borderWidth: .5,
        borderColor: "#f6f6f6",
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textProfile: {
        color: "#fdfdfd",
        fontWeight: "bold",
        textAlign: "center",
        marginLeft:22,
        marginTop:17,
        fontSize:25

    },
    modalText: {
        color:colors.grey,
        marginTop: 5,
        marginStart:10,
        fontSize:17,
        textAlign: "center"
    },
    profileButton:{
        backgroundColor: colors.yellow,
        paddingHorizontal: 35,
        paddingTop:25,
        paddingBottom:10,
        borderTopEndRadius:20,
        marginTop:1,
        width: "100%"
    },
    secondaryButton:{
        paddingHorizontal: 20,
        paddingTop:25,
        paddingBottom:10,
        borderTopEndRadius:20,
        marginTop:1,
        width: "100%"
    }

  });
