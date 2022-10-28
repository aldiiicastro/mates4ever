import * as React from 'react'
import {View, Image, Text, ScrollView, Button, Share} from 'react-native'
import {petDetails} from "../../../styles/PetStyle.js"
import Tag from '../../drawerlayout/Tag.js'
import {style} from "../../../styles/Commons.js"
import Icon from 'react-native-vector-icons/MaterialIcons'
import base64 from 'react-native-base64'

export default function PetDetails({navigation, pet}) {

    const share = async (customOptions) => {
        try {
            await Share.share(customOptions);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ScrollView vertical style={{backgroundColor: "#fff", width: "100%"}}>
            <Icon name="arrow-back" size={25} style={{marginLeft: 20, marginTop: 15}}
                  onPress={() => navigation.goBack()}/>
            <View style={petDetails.imageContainer}>
                <Image
                    source={pet.image ? {uri: pet.image } : require('../../../assets/DefaultPet.png')}
                    style={petDetails.imageDetail}/>
            </View>
            <View style={petDetails.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                    }}>
                    <Text testID={"pet-details-name"} style={{fontSize: 30, fontWeight: 'bold'}}>{pet.name}</Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={style.alignItems}>
                        <Text style={[style.bold, {fontSize: 18}]}>Edad: </Text>
                        <Text testID={"pet-details-age"} style={{fontSize: 18}}> {pet.age ? pet.age : "No especifica" }</Text>
                    </View>
                    <Tag value={pet.state}/>
                </View>
                {pet.type &&
                    <View
                        style={[style.alignItems, {marginLeft:15}]}>
                        <Text testID={"pet-details-age"} style={[style.bold, {fontSize: 18}]}> Tipo: </Text>
                        <Text testID={"pet-details-age"} style={{fontSize: 18}}> {pet.type}</Text>
                    </View>
                }

                {pet.breed &&
                    <View
                        style={[style.alignItems, {marginLeft:15}]}>
                        <Text testID={"pet-details-age"} style={[style.bold, {fontSize: 18}]}> Raza: </Text>
                        <Text testID={"pet-details-age"} style={{fontSize: 18}}> {pet.breed}</Text>
                    </View>
                }

                <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                    <Text testID={"pet-details-description-field"}
                          style={{fontSize: 20, fontWeight: 'bold'}}>Descripción</Text>
                    <Text
                        testID={"pet-details-description"}
                        style={petDetails.descriptionDetail}>
                        {pet.description ? pet.description : "-"}
                    </Text>

                </View>

                <View style={{paddingHorizontal: 20, marginTop: 10}}>
                    <Text testID={"pet-details-description-field"}
                          style={{fontSize: 20, fontWeight: 'bold'}}>Historial medico</Text>
                    <Text
                        testID={"pet-details-description"}
                        style={petDetails.descriptionDetail}>
                        {pet.medicalHistory ? pet.medicalHistory : "-"}
                    </Text>
                    <Text testID={"pet-details-castrado"} style={[petDetails.descriptionDetail, style.bold]}> • {pet.castrated ? "Esta castrado" : "No esta castrado" }</Text>
                    <Text testID={"pet-details-vaccinate"} style={[petDetails.descriptionDetail, style.bold]}> • {pet.vaccine ? "Esta vacunado" : "No esta vacunado" }</Text>
                </View>
                <View >
                    <Icon
                        style={{marginLeft: 20, marginTop: 15}}
                        name={"share"}
                        size={25}
                        onPress={async () => {
                            await share({
                                title: "Mascota " + pet.state,
                                message: pet.description,
                                url: 'data:' + pet.image,
                            });
                        }}
                        title="Share Image"
                    />
                </View>
            </View>
        </ScrollView>
    )
}


