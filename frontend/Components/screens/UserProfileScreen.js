import React, {useEffect, useState} from 'react'
import {FlatList, Image, Linking, Text, View} from 'react-native'
import profileStyles from '../../styles/ProfileStyles'
import ContactCard from '../users/ContactCard'
import Icon from "react-native-vector-icons/MaterialIcons"
import {petCreationScreenStyle} from '../../styles/pet/PetCreationScreenStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUserDataByEmail} from '../../server/Api'
import Back from "../drawerlayout/Back"
import User from '../../model/User'
import PetCard from '../pets/card/PetCard'
import {petsStatesStyle} from "../../styles/pet/PetStatesStyle";
import Pet from "../../model/Pet";
import * as Location from "expo-location";

export default function UserProfileScreen({navigation, route}) {
    const [user, setUser] = useState({})
    const [pets, setPets] = useState(null)
    const getUserProfile = async () => {
        const userEmail = route.params
        const response = await getUserDataByEmail(userEmail)
        try {
            let reg = await Location.reverseGeocodeAsync(response.data.coordinates)
            setUser(new User(response.data, reg[0].name, reg[0].region))
            //Si buscasemos los pets según el email
            // const petResponse = await getPetByUser(response.data.email)
            // setPets(petResponse.data.pets.map((pet)=> new Pet(pet)))
            setPets(response.data.pets.map((pet) => new Pet(pet)))
        } catch (error) {
            alert('Ha habido un error. Contactese con el administrador')
        }

    }
    useEffect(() => {
        getUserProfile()
    }, [])

    const renderContactHeader = () => {
        return (<View style={profileStyles.headerContainer}>
            <View style={profileStyles.coverContainer}>

                <View style={profileStyles.profileImageContainer}>
                    {user.image ? <Image source={{uri: user.image}} style={profileStyles.profileImage}/> :
                        <Image source={require('../../assets/DefaultUser.png')}
                               style={profileStyles.profileImage}/>}
                </View>

                <View style={profileStyles.coverMetaContainer}>
                    <Text testID={'user-name'} style={profileStyles.coverName}>{user.name} {user.lastname}</Text>
                </View>
                <View style={profileStyles.locationStyle}>
                    <Icon name="location-pin" size={25}/>
                    <Text testID={'user-location'} style={profileStyles.coverBio}> {user.municipality}, {user.province} </Text>
                </View>
            </View>
        </View>)
    }

    const renderContact = () => {
        return (<View>
            <ContactCard
                contact={user.email}
                icon={"email"}
                onPress={() => Linking.openURL('mailto:support@example.com')}
            />
            {user.phone ? <ContactCard
                contact={user.phone}
                icon={"local-phone"}
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${user.phone}`)}
            /> : <View/>}
        </View>)
    }

    const renderLogOut = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Icon testID={'logOut'} name="logout" size={25} style={petCreationScreenStyle.iconSearch} onPress={() => {
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
    const renderComponent = () => {
        return (
            <View>
                <Back onPress={() => navigation.goBack()} headerStyle={profileStyles.header}/>
                {renderContactHeader()}
                {renderContact()}
                <View style={{margin: 15}}></View>
                {renderLogOut()}
                <View style={{margin: 20}}></View>
            </View>
        )
    }

    const renderPetsPosts = () => {
        return (
            <View>
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-evenly'}}
                    contentContainerStyle={petsStatesStyle.contentContainerStyle}
                    numColumns={2}
                    data={pets}
                    renderItem={({item}) => {
                        return <PetCard navigation={navigation} pet={item}/>
                    }}
                    ListHeaderComponent={renderComponent()}
                />
            </View>)
    }

    return (
            <View style={[profileStyles.container]}>
                <View style={profileStyles.cardContainer}>
                    {pets ? renderPetsPosts() : renderComponent()}
                </View>
            </View>
    )
}




