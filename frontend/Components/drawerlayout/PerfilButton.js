import * as React from 'react';
import { View } from 'react-native';
import { petDetails } from '../../styles/PetStyle.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import { petScreenStyle } from '../../styles/PetScreenStyle.js';
import { colors } from '../../styles/Colors.js';

export default function PerfilButton({navigation}) {
    return (
      <View style={{ marginTop: -32, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Icon style={{ padding:2, paddingLeft:4, borderRadius: 100, borderWidth:1, backgroundColor: colors.white }} name="person" size={25} onPress={() => navigation.navigate('Perfil')} />
      </View>
    );
}