import {Card, Paragraph, Title} from "react-native-paper";
import petCardStyle from "./styles/PetCardStyles";
import {Text, View} from "react-native";
import * as React from "react";

export default function PetCard(props) {
    return props.pets.map((pet, index) => {
        return (
            <Card style={[petCardStyle.container, (pet.state === 'Perdido') ? petCardStyle.container_backGround_red: petCardStyle.container_backGround_yellow]} key={index}>
                <Card.Content>
                    <Title style={petCardStyle.card_title}>{pet.state}</Title>
                    <Paragraph style={petCardStyle.card_title}>Edad: {pet.age}</Paragraph>
                </Card.Content>
                <Card.Cover source={{uri: pet.image}} style={petCardStyle.card_image}/>
                <View style={petCardStyle.text_container_grey}>
                    <Text style={ petCardStyle.card_text}>{pet.name}</Text>
                </View>
            </Card>)
    })
}