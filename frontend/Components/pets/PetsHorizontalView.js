import {Title} from "react-native-paper";
import {petCardStyle} from "./styles/PetCardStyles";
import {ScrollView, View} from "react-native";
import PetCard from "./PetCard";
import * as React from "react";

export default function PetsHorizontalView(props) {
    return(<View>
        {(props.pets.length) ?  <Title style={petCardStyle.card_title}>{props.title}</Title> : <Title/>}
            <ScrollView horizontal>
                <PetCard navigation={props.navigation} pets={props.pets}></PetCard>
            </ScrollView>
    </View>)
}
