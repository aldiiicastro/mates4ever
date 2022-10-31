import * as React from 'react'
import {View, Text} from 'react-native'
import {colors} from "../../styles/Colors.js"
import {petDetailsStyle} from "../../styles/pet/PetDetailsStyle";

export default function Tag(props) {

    return (
        <View style={petDetailsStyle.tag}>
            <Text testID={"pet-details-state"}
                  style={{
                      marginLeft: 15,
                      color: colors.violet,
                      fontWeight: 'bold',
                      fontSize: 16,
                  }}>
                {props.value}
            </Text>
        </View>
    )
}

