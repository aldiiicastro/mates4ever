import * as React from 'react'
import {Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {style} from '../../styles/Commons.js';

export default function Back({onPress, text, headerStyle}) {
    return (
        <View style={headerStyle}>
            <View style={style.alignItems}>
                <Icon name="arrow-back" style={{marginStart: 10}} size={25} onPress={onPress}/>
                <Text style={[style.titleText]}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

