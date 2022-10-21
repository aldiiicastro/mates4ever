import React, {useEffect, useState} from 'react'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import {Link} from '@react-navigation/native'
import profileStyles from '../../styles/ProfileStyles'
import ContactCard from '../users/ContactCard'
import Icon from "react-native-vector-icons/MaterialIcons"
import {petScreenStyle} from '../../styles/PetScreenStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUserDataByEmail} from '../../server/Api'
import Back from "../drawerlayout/Back"
import User from '../../model/User'
import PetCard from '../pets/card/PetCard'
import {petsStatesStyle} from "../../styles/PetStyle.js"


function Profile({navigation, route}) {
    const [user, setUser] = useState({})
    const [pets, setPets] = useState({})
    useEffect(() => {
        getUserDataByEmail(route.params).then((response) => {
            setUser( new User(response.data) )
            setPets(user.pets)
        }).catch((error) => console.log(error))
    }, [])

    const renderContactHeader = () => {
        return (
            <View style={profileStyles.headerContainer}>
                <View style={profileStyles.coverContainer}>

                    <View style={profileStyles.profileImageContainer}>
                        {user.image ?
                            <Image source={{uri: user.image}} style={profileStyles.profileImage}/>
                            :
                            <Image source={require('../../assets/DefaultUser.png')} style={profileStyles.profileImage}/>
                        }
                    </View>

                    <View style={profileStyles.coverMetaContainer}>
                        <Text style={profileStyles.coverName}>{user.name} {user.lastname}</Text>
                    </View>
                    <View style={profileStyles.locationStyle}>
                        <Icon name="location-pin" size={25}/>
                        <Text style={profileStyles.coverBio}> {user.municipality}, {user.province} </Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderContact = () => {
        return (
            <View>
                <ContactCard
                    contact={user.email}
                    icon={"email"}
                />
                {
                    user.phone &&
                    <ContactCard
                        contact={user.phone}
                        icon={"local-phone"}
                    />
                }
            </View>
        )
    }

    const renderPetsPosts = () => {
        return (
            <View>
                <View style={profileStyles.linkContainer}>
                    {/* <View style={profileStyles.linkRow}>
                        <Link to={{screen: 'Inicio'}}>
                            Ver todos
                        </Link>
                    </View>
                    <View style={profileStyles.iconRow}>
                        <Icon
                            name="arrow-right-alt"
                            size={25}
                        />
                    </View> */}
                </View>
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-evenly'}}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={petsStatesStyle.contentContainerStyle}
                    numColumns={2}
                    data={pets}
                    renderItem={({item}) => {
                        // console.log("hola", item)
                        return <PetCard navigation={navigation} pet={item}/>
                    }}
                />
            </View>
        )
    }

    const renderLogOut = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Icon name="logout" size={25} style={petScreenStyle.iconSearch} onPress={() => {
                    AsyncStorage.clear()
                    navigation.navigate("Login")
                }}/>
                <Text style={{fontSize: 20}} onPress={() => {
                    AsyncStorage.clear()
                    navigation.navigate("Login")
                }}>Salir</Text>
            </View>
        )
    }

    return (
        <ScrollView style={profileStyles.scroll}>
            <View style={[profileStyles.container]}>
                <View style={profileStyles.cardContainer}>
                    <Back onPress={() => navigation.goBack()} headerStyle={profileStyles.header}/>
                    {renderContactHeader()}
                    {renderContact()}
                    <View style={{margin:15}}></View>
                    {renderLogOut()}
                    <View style={{margin:20}}></View>
                    {user.pets ? renderPetsPosts() : null}
                </View>
            </View>
        </ScrollView>
    )
}

export default Profile



