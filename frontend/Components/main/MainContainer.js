import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
const settingsName = "Configuraciones";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === detailsName) {
                            iconName = focused ? 'list' : 'list-outline';

                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "rgb(171,72,72)",
                    tabBarInactiveTintColor:"rgba(0,0,0, 0.3)",
                })}
                >
                <Tab.Screen name={homeName} component={HomeScreen} options={{headerTitle: (props) => (<TabScreenProperties name={"Mates4Ever"}/>)}}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}   options={{headerTitle: (props) => (<TabScreenProperties name={settingsName}/>),}}/>
                <Tab.Screen name={detailsName} component={DetailsScreen} options={{headerTitle: (props) => (<TabScreenProperties name={detailsName}/>)}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;