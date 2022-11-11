import * as React from 'react'
import {View, TouchableOpacity} from 'react-native'
import PetScreen from "./PetScreen.js"
import {colors} from "../../styles/Colors.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {style} from "../../styles/Commons"
import LostPetGeolocationNotification from '../geolocation/LostPetGeolocationNotification.js'
import LostsPets from '../modals/LostsPets.js'

export default function HomeScreen({navigation}) {
    return (
        <View testID={"homeScreenView"}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.beige}}>
            <LostsPets navigation={navigation}/>
            <PetScreen navigation={navigation}></PetScreen>
            <View>
                <TouchableOpacity
                    testID={'create-pet'}
                    style={[style.floatButton]}
                    onPress={() => navigation.navigate('Agregar')}
                >
                    <Icon name='add' size={30} color='#fff'/>
                </TouchableOpacity>
            </View>
            {/* <LostPetGeolocationNotification/> */}
        </View>
    )
}
