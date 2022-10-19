import * as React from 'react'
import {View, TouchableOpacity} from 'react-native'
import PetScreen from "./PetScreen.js"
import {colors} from "../../styles/Colors.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import {style} from "../../styles/Commons"

export default function HomeScreen({navigation}) {
    return (
        <View testID={"homeScreenView"}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.beige}}>
            <PetScreen navigation={navigation}></PetScreen>
            <View>
                <TouchableOpacity
                    style={[style.floatButton]}
                    onPress={() => navigation.navigate('Agregar')}
                >
                    <Icon name='add' size={30} color='#fff'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
