
import {Image, Text} from "react-native";
import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function TabScreenProperties(props) {
    return (  <Text style={{position: 'absolute', fontSize: 25}}>
        {props.name}
        <Image
            style={{
                height: 40,
                width: 359.5
            }}
            source={require('../../assets/Logo.png')}
            resizeMode="contain"
        />
    </Text>)
}