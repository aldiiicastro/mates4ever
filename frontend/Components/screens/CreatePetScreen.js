import {View} from "react-native"
import * as React from "react"
import PetCreation from "../pets/creation/PetCreation.js"
import {createPetScreen} from "../../styles/CreatePetScreen";

export default function CreatePetScreen({navigation}) {
    return (
        <View style={createPetScreen.viewStyle}>
            <PetCreation navigation={navigation}></PetCreation>
        </View>
    )
}
