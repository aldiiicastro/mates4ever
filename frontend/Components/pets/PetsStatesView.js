import * as React from "react"
import {FlatList, Text, TouchableOpacity, View} from "react-native"
import {useEffect, useState} from "react"
import PetCard from "./card/PetCard.js"
import {petsStatesStyle} from "../../styles/pet/PetStatesStyle";

export default function PetsStatesView(props) {
   
    return (
        <View>
            <FlatList
                columnWrapperStyle={petsStatesStyle.columnsWrapperStyle}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={petsStatesStyle.contentContainerStyle}
                numColumns={2}
                data={props.pets}
                renderItem={({item}) => {
                    return <PetCard navigation={props.navigation} pet={item}/>
                }}
            />
        </View>)
}
