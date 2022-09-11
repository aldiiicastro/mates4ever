import * as React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {useEffect, useState} from "react";
import {getPetById, fetchSearch} from "../../server/Api";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {petDetails} from "./styles/PetCardStyles";
import Tag from '../common/Tag';
import Back from '../common/Back';
// import Back from '../common/back';


export default function PetDetails({navigation, id }) {
    const [pet, setPet] = useState({})
    
    useEffect(() => {
        getPetById(id).then((response) => {setPet(response.data)})
    }, [id]);
    return (
        <ScrollView vertical style={{ backgroundColor: "#fff", width: "100%" }}>
            <Back navigation={navigation} />
            <View style={petDetails.imageContainer}>
                <Image
                    source={{ uri:pet.image }}
                    style={{resizeMode: 'cover', flex: 1, width: "90%", height: 300}} />
            </View>
            <View style={petDetails.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{pet.name}</Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Edad: {pet.age}</Text>
                <Tag value={pet.state}/>
                </View>
                <View style={{paddingHorizontal: 20, marginTop: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Descripción</Text>
                <Text
                    style={{
                    color: 'grey',
                    fontSize: 16,
                    lineHeight: 22,
                    marginTop: 10,
                    marginBottom: 20,

                    }}>
                    {pet.description}
                </Text>
            </View>
        </View>
    </ScrollView>
    )
}


