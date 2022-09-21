import * as React from 'react';
import { View } from 'react-native';
import PetDetails from '../pets/details/PetDetails.js';

export default function DetailsScreen({ navigation, route}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
                <PetDetails navigation={navigation} id={route.params}></PetDetails>
        </View>
    );
}
