import * as React from 'react';
import {View} from 'react-native';
import PetScreen from "./PetScreen.js";
import {FloatingAction} from "react-native-floating-action";
import {colors} from "../../styles/Colors.js";

export default function HomeScreen({ navigation }) {
    return (
        <View testID={"homeScreenView"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white}}>
           <PetScreen navigation={navigation}></PetScreen>
            <View>
                <FloatingAction
                    onOpen = {()=> navigation.navigate('Agregar')}
                    buttonSize={50}
                    color={'black'}
                    position={'center'}
                    onPressItem={name => {
                        console.log(`selected button: ${name}`);
                    }}
                />
            </View>
        </View>
    );
}
