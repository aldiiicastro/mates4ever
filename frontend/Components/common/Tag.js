import * as React from 'react';
import { View, Text } from 'react-native';
import { petDetails } from '../pets/styles/PetCardStyles';

export default function Tag(props) {

    return (
        <View style={petDetails.tag}>
            <Text
              style={{
                marginLeft: 15,
                color: "#fff",
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {props.value}
            </Text>
        </View>
    );
}

