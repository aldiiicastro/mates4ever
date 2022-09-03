import * as React from 'react';
import {View, Text} from 'react-native';
import Pets from "../PetsScreen/Pets";

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}></Text>
            <Pets></Pets>
        </View>
    );
}