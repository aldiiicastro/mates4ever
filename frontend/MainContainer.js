import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import {Image, Text} from "react-native";

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
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                <Tab.Screen name={settingsName} component={SettingsScreen}   options={{
                    headerTitle:
              (props) => (
                  <Text style={{position: 'absolute', fontSize: 25}}>
                      {settingsName}
                            <Image
                                style={{
                                    height: 40,
                                    width: 359.5
                                }}
                                   source={require('./assets/Logo.png')}
                                resizeMode="contain"
                            />
                  </Text> ),
                }}/>
                <Tab.Screen name={homeName} component={HomeScreen} options={{
                    headerTitle:
                        (props) => (
                            <Text style={{position: 'absolute', fontSize: 25}}>
                                {homeName}
                                <Image
                                    style={{
                                        height: 40,
                                        width: 600
                                    }}
                                    source={require('./assets/Logo.png')}
                                    resizeMode="contain"
                                />
                            </Text> ),
                }}/>
                <Tab.Screen name={detailsName} component={DetailsScreen} options={{
                    headerTitle:
                        (props) => (
                            <Text style={{position: 'absolute', fontSize: 25}}>
                                {detailsName}
                                <Image
                                    style={{
                                        height: 40,
                                        width: 540
                                    }}
                                    source={require('./assets/Logo.png')}
                                    resizeMode="contain"
                                />
                            </Text> ),
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;