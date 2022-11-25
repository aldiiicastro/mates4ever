import * as React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import PetScreen from "./PetScreen.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {style} from "../../styles/Commons"
import * as Notifications from "expo-notifications";
import {useEffect} from "react";
import {homeScreenStyle} from "../../styles/HomeScreenStyle";
import { Provider } from 'react-native-paper'
import { petCreationScreenStyle } from '../../styles/pet/PetCreationScreenStyle.js'
import PerfilButton from '../drawerlayout/PerfilButton.js'

export default function HomeScreen({navigation}) {

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
        
        <Provider>
            <View testID={"homeScreenView"}
                style={homeScreenStyle.viewStyle}>
                <View style={petCreationScreenStyle.header}>
                    <View>
                        <Text style={petCreationScreenStyle.titleText}>
                            Mates4Ever
                        </Text>
                        <PerfilButton navigation={navigation}></PerfilButton>
                    </View>
                </View>
                <PetScreen navigation={navigation}/>
                <View>
                    <TouchableOpacity
                        testID={'create-pet'}
                        style={[style.floatButton]}
                        onPress={() => navigation.navigate('Agregar')}
                    >
                        <Icon name='add' size={30} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </View>
        </Provider>
    )
}
