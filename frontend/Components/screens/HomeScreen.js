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
import DrawerMenu from '../drawerlayout/DrawerMenu.js'
import MapLostPets from '../map/MapLostPets.js'

export default function HomeScreen({navigation}) {
    const [mapModalVisible, setMapModalVisible] = React.useState(true);

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
            <MapLostPets modalVisible={mapModalVisible} navigation={navigation} setModalVisible={setMapModalVisible} />
            <View testID={"homeScreenView"}
                style={homeScreenStyle.viewStyle}>
                <View style={{width:"100%"}}>
                    <View style={petCreationScreenStyle.header}>
                        <DrawerMenu navigation={navigation}/>
                        <Text style={petCreationScreenStyle.titleText}>
                            Mates4Ever
                        </Text>
                        {/* <PerfilButton navigation={navigation}></PerfilButton> */}
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
