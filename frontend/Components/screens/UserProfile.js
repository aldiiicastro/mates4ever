import React, { Component } from 'react'
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Link } from '@react-navigation/native';
import profileStyles from '../../styles/ProfileStyles'
import ContactCard from '../common/ContactCard'
import Icon from "react-native-vector-icons/MaterialIcons";
import PetCardEjemplo from '../pets/card/PetCardEjemplo';
import Pet from '../../model/Pet';
import { petScreenStyle } from '../../styles/PetScreenStyle';

function Profile3 () {
  
  const pet = 
    new Pet({
      id : "1",
      name : "emma",
      image : "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Flash.jpg?raw=true",
      age : "2",
      date : "32",
      type : "Perro",
      breed : "",
      state : "Transito",
      tutor : "Mates4Ever",
      description :  "adad"
    })
  
  const renderContactHeader = () => {
    return (
      <View style={profileStyles.headerContainer}>
        <View style={profileStyles.coverContainer}> 
          <ImageBackground
            source={{uri: "https://www.aboutespanol.com/thmb/0vdI-sxY7RGXpvRlMnnk3qa4bhc=/300x169/smart/filters:no_upscale()/Color-Amarillo-56a036e53df78cafdaa08301.jpg"}}
            style={profileStyles.coverImage}
          />
            <View style={profileStyles.profileImageContainer}>
              <Image
                source={{uri: "https://raw.githubusercontent.com/aldiiicastro/mates4ever/main/frontend/assets/Logo.png"}}
                style={profileStyles.profileImage}
              />
            </View> 
            <View style={profileStyles.coverMetaContainer}>
              <Text style={profileStyles.coverName}>{"Mates4Ever"}</Text>
              {/* <Icon
                  name="location-pin"
                  size={25}
                  // style={ styles.emailIcon }
                /> */}
              <Text style={profileStyles.coverBio}> {"Quilmes, Buenos Aires"}</Text>
            </View>
        </View>
        
      </View>
    )
  }

  const renderContact = () => {
    return (
      <View >
          <ContactCard 
            contact={"+54 11 12345678"}
            // onPress={onPressPhone}
            icon={"local-phone"}
          />
          <ContactCard 
            contact={"Mates4Ever@gmail.com"}
            // onPress={onPressEmail}
            icon={"email"}
          />
      </View>
    )
  }

  const renderPetsPosts = () => {
    return (
      <View>
        <View style={profileStyles.linkContainer} >
          <View style={profileStyles.linkRow}>
            <Link to={{ screen: 'Inicio' }}>
              Ver todos
            </Link >
          </View>
          <View style={profileStyles.iconRow}>
            <Icon
              name="arrow-right-alt"
              size={25}
            />
          </View>
        </View>
        <View style={profileStyles.masonryContainer}>
          <View>
            <PetCardEjemplo pet={pet} />
          </View>
        </View>
      </View>
    )
  } 

  
    return (
      <ScrollView style={profileStyles.scroll}>
        <View style={[profileStyles.container]}>
          <View style={profileStyles.cardContainer}>
            {renderContactHeader()}
            {renderContact()}

        <Icon name="logout" size={25} style={petScreenStyle.iconSearch} onPress={() => {
                            AsyncStorage.clear()
                            navigation.navigate("Auth")}}/>
            {renderPetsPosts()}
          </View>
        </View>
      </ScrollView>
    )
}

export default Profile3



