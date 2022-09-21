import * as React from 'react';
import HomeScreen from "./Components/screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import DetailsScreen from "./Components/screens/DetailsScreen.js";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePetScreen from "./Components/screens/CreatePetScreen.js";
import {colors} from "./styles/Colors.js";
import LoginScreen from "./Components/login/LoginScreen.js";

const Stack = createNativeStackNavigator();
function App() {
  return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={colors.beige} />
        <Stack.Navigator screenOptions={{header: () => null}} initialRouteName="Inicio">
            <Stack.Screen name={"Login"} component={LoginScreen} />
            <Stack.Screen name={"Inicio"} component={HomeScreen} />
            <Stack.Screen name={"Detalles"} component={DetailsScreen} />
            <Stack.Screen name={"Agregar"} component={CreatePetScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
