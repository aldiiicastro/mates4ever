import * as React from 'react';
import {Card, Paragraph, Title} from 'react-native-paper';
import {Text, View} from 'react-native';
import styles from "./PetCardStyles";
import {useEffect, useState} from "react";
import {fetchPets} from "../server/Api";


export default function PetCard(props) {
/*    const [pets, setPets] = useState(null)
    useEffect(() => {
       fetchPets().then((response) => {
            setPets(response.data);
        });
    }, []);
*/
    if (!props.pets) return <Card></Card>
    return props.pets.map((pet, index) => {
        return (
        <Card style={(pet.state === 'Perdido') ? styles.container_red : styles.container_yellow} key={index}>
            <Card.Content>
                <Title style={styles.card_title}>{pet.state}</Title>
                <Paragraph style={styles.card_title}>{pet.age}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: pet.image }} style={styles.card_image}/>
            <View style={styles.text_container_grey}>
                <Text style={ styles.card_text}>{pet.name}</Text>
            </View>
        </Card>)
    })
}

