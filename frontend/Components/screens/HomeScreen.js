import * as React from 'react';
import {View, Text} from 'react-native';
import PetsScreen from "../pets/PetsScreen";

export default function HomeScreen({ navigation }) {
    return (
        <View testID={"homeScreenView"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <PetsScreen navigation={navigation}></PetsScreen>
        </View>
    );
}