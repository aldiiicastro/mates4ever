import * as React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PetScreen from "./PetScreen.js"
import { colors } from "../../styles/Colors.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { style } from "../../styles/Commons"
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import LostsPets from "../modals/LostsPets";

export default function HomeScreen({ navigation }) {

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
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.beige }}>
            <LostsPets navigation={navigation} />
            <PetScreen navigation={navigation}></PetScreen>
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
