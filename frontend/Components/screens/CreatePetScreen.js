import {View} from "react-native"
import * as React from "react"
import PetCreation from "../pets/creation/PetCreation.js"

export default function CreatePetScreen({ navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
            <PetCreation navigation={navigation}></PetCreation>
        </View>

    )
}
