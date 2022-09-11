import * as React from 'react';
import { View, Text } from 'react-native';
import PetDetails from '../pets/PetDetails';

export default function DetailsScreen({ navigation, route}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
                <PetDetails navigation={navigation} id={route.params}></PetDetails>
        </View>
    );
}