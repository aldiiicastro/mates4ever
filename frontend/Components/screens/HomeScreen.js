import * as React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PetScreen from "./PetScreen.js"
import { colors } from "../../styles/Colors.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
<<<<<<< HEAD
import {style} from "../../styles/Commons"
import * as Notifications from "expo-notifications";
import {useEffect} from "react";
import LostPets from "../modals/LostPets";

export default function HomeScreen({navigation}) {

=======
import { style } from "../../styles/Commons"
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import LostsPets from "../modals/LostsPets";

export default function HomeScreen({ navigation }) {

>>>>>>> 5f258fa2b6158f1a116679e9339c53be9d004791
    const lastNotificationResponse = Notifications.useLastNotificationResponse();
    useEffect(() => {
        if (
            lastNotificationResponse &&
            lastNotificationResponse.notification.request.content.data.id &&
            lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
        ) {
            navigation.navigate('Detalles', lastNotificationResponse.notification.request.content.data.id)
        }
    }, [lastNotificationResponse]);
    return (
        <View testID={"homeScreenView"}
<<<<<<< HEAD
              style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.beige}}>
            <PetScreen navigation={navigation}/>
=======
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.beige }}>
            <PetScreen navigation={navigation}></PetScreen>
>>>>>>> 5f258fa2b6158f1a116679e9339c53be9d004791
            <View>
                <TouchableOpacity
                    testID={'create-pet'}
                    style={[style.floatButton]}
                    onPress={() => navigation.navigate('Agregar')}
                >
                    <Icon name='add' size={30} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
    )
}
