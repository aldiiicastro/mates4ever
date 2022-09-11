import * as React from 'react';
import { View } from 'react-native';
import { petDetails } from '../pets/styles/PetCardStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Back({navigation: { goBack }}) {
    return (
      <View style={petDetails.header}>
          <Icon name="arrow-back" size={28} onPress={() => goBack()} />
      </View>
    );
}

