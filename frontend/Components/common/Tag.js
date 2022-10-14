import * as React from 'react'
import { View, Text } from 'react-native'
import { petDetails } from '../../styles/PetStyle.js'
import {colors} from "../../styles/Colors.js"

export default function Tag(props) {

    return (
        <View style={petDetails.tag}>
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

