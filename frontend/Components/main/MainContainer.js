import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {Image, Text} from "react-native";
import TabScreenProperties from "./TabScreenProperties";

//Screen names
const homeName = "Inicio";
const detailsName = "Detalles";

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
              initialRouteName={homeName}
                // screenOptions={({ route }) => ({
                //     tabBarIcon: ({ focused, color, size }) => {
                //         let iconName;
                //         let rn = route.name;

                //         if (rn === homeName) {
                //             iconName = focused ? 'home' : 'home-outline';

                //         } else if (rn === detailsName) {
                //             iconName = focused ? 'list' : 'list-outline';

                //         }
                //         // You can return any component that you like here!
                //         return <Ionicons name={iconName} size={size} color={color} />;
                //     },
                //     tabBarActiveTintColor: "rgb(171,72,72)",
                //     tabBarInactiveTintColor:"rgba(0,0,0, 0.3)",
                // })}
                >
                <Stack.Screen name={homeName} component={HomeScreen} options={{ title: "Mates4Ever"}}/>
                <Stack.Screen name={detailsName} component={DetailsScreen} options={{ title: "Mates4Ever"}}/>
            </Stack.Navigator> 
        </NavigationContainer>
    );
}

export default MainContainer;