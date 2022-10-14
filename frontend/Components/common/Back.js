import * as React from 'react';
import { Text, View } from 'react-native';
import { petDetails } from '../../styles/PetStyle.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { style } from '../../styles/Commons.js';
import { petScreenStyle } from '../../styles/PetScreenStyle.js';

export default function Back({onPress, text}) {
    return (
      <View style={petScreenStyle.header}>
        <View style={style.alignItems}>
            <Icon name="arrow-back" style={{marginStart: 10}} size={25} onPress={onPress}/>
            <Text style={[style.titleText]}>
              {text}
            </Text>
        </View>
      </View>
    );
}

