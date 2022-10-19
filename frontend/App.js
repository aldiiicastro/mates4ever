import * as React from 'react'
import HomeScreen from "./Components/screens/HomeScreen"
import DetailsScreen from "./Components/screens/DetailsScreen.js"
import CreatePetScreen from "./Components/screens/CreatePetScreen.js"
import LoginScreen from "./Components/screens/LoginScreen.js"
import UserProfile from "./Components/screens/UserProfile"
import RegisterScreen from "./Components/screens/RegisterScreen"
import SplashScreen from "./Components/screens/SplashScreen"
import {NavigationContainer} from "@react-navigation/native"
import {StatusBar} from "react-native"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {colors} from "./styles/Colors.js"


const Stack = createNativeStackNavigator()

function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor={colors.beige}/>
            <Stack.Navigator screenOptions={{header: () => null}} initialRouteName="SplashScreen">
                <Stack.Screen name={"SplashScreen"} component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"Login"} component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"Inicio"} component={HomeScreen}/>
                <Stack.Screen name={"Detalles"} component={DetailsScreen}/>
                <Stack.Screen name={"Perfil"} component={UserProfile}/>
                <Stack.Screen name={"Agregar"} component={CreatePetScreen}/>
                <Stack.Screen name={"Registro"} component={RegisterScreen}
                              options={{
                                  title: 'Registro', //Set Header Title
                                  headerStyle: {
                                      backgroundColor: colors.violet, //Set Header color
                                  },
                                  headerTintColor: '#fff', //Set Header text color
                                  headerTitleStyle: {
                                      fontWeight: 'bold', //Set Header text style
                                  },
                              }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
