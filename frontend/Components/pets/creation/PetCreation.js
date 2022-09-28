import * as React from "react";
import {useState} from 'react';
import {Text, Image, View, TextInput, Button, SafeAreaView, TouchableHighlight} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Checkbox} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../styles/Colors";
import { ScrollView } from "react-native-gesture-handler";
import {form} from "../../../styles/Form";
import {style} from "../../../styles/Commons";
import { petScreenStyle } from "../../../styles/PetScreenStyle";
import * as ImagePicker from 'expo-image-picker';

export default function PetCreation({navigation}) {
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [state, setState] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [vaccine, setVaccine] = useState(false);
    const [castrated, setCastrated] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState('');
    const [description, setDescription] = useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
    
        if (!(result.cancelled)) {
          setImage(result.uri);
        }
        setImage(result)
    };

    
    
    const createFormData = () => {
        const data = new FormData();

        data.append('photo', {
          name: image.fileName,
          type: image.type,
          uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        });
        console.log(data["_parts"])
        
        return data;
      };

    const publish = () => {
        const data = {
            'name': name,
            'age': age,
            'state': state,
            'type': type,
            'breed': breed,
            'vaccine': vaccine,
            'castrated': castrated,
            'medicalHistory': medicalHistory,
            'description': description,

        }

        console.log(image)
    }

    return (
        <ScrollView style={style.fullContainer}>
            <View style={petScreenStyle.header}>
                <View style={form.alignItems}>
                    <Icon name="arrow-back" style={{marginStart: 10}} size={25} onPress={() => navigation.goBack()}/>
                    <Text style={[style.titleText]}>
                        Cargar una mascota
                    </Text>
                </View>
            </View>
            <View style={form.image} on>
                <TouchableHighlight onPress={pickImage}>
                    {image ? 
                    <Image source={{ uri: image }} style={ form.imageSize }/> 
                    : 
                    <Image source={require('../../../assets/DefaultPet.png')} style={ form.imageSize } />}
                </TouchableHighlight>
                <View style={form.imageIcon} >
                    <Icon name="create" size={28} onPress={pickImage}  />
                </View>
            </View>
            <View style={[style.marginX, style.bgWhite]}>
                <View style={form.inputLineBox}>
                    <TextInput 
                        style={form.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nombre"
                        activeUnderlineColor={colors.red}
                        />
                        
                </View>
                <View style={form.inputLineBox}>
                    <TextInput
                        style={form.input}
                        onChangeText={setAge}
                        value={age}
                        placeholder="Fecha aproximada de nacimiento" />
                </View>
                <View style={form.pickerLineBox}>
                    <Picker
                        style={form.inputFont}
                        selectedValue={state}
                        onValueChange={currentAge => setState(currentAge)}>
                        <Picker.Item label="Tipo de publicacion" value={null} />
                        <Picker.Item label="Transito" value="Transito" />
                        <Picker.Item label="Adopción" value="Adopción" />
                        <Picker.Item label="Perdido" value="Perdido" />
                    </Picker>
                </View>
                <View style={form.pickerLineBox}>
                    <Picker
                        style={form.inputFont}
                        selectedValue={type}
                        onValueChange={currentState => setType(currentState)}>
                        <Picker.Item label="Tipo de animal" value={null} />
                        <Picker.Item label="Perro" value="Perro" />
                        <Picker.Item label="Gato" value="Gato" />
                        <Picker.Item label="Otro" value="Otro" />
                    </Picker>
                </View>
                <View style={form.inputLineBox}>
                    <TextInput
                        style={form.input}
                        onChangeText={setBreed}
                        value={breed}
                        placeholder="Tiene raza? Cual?" />
                </View>
                <View style={form.inputLineBox}>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={form.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={"Cuentanos un poco sobre " + (name ? name : "el/ella") } />
                </View>
                <View style={form.inputLineBox}>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={form.input}
                        onChangeText={setMedicalHistory}
                        value={medicalHistory}
                        placeholder="Tiene algun problema medico? Algo que quieras destacar?" />
                </View>
                <View style={form.alignItems}>
                    <Checkbox
                        color={colors.yellow}
                        status={vaccine ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setVaccine(!vaccine);
                        }}
                    />
                    <Text style={style.label}>¿Tiene las vacunas al día?</Text>
                </View>
                <View style={form.alignItems}>
                    <Checkbox
                        color={colors.yellow}
                        status={castrated ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setCastrated(!castrated);
                        }}
                    />
                    <Text style={style.label}>¿Esta castrado?</Text>
                </View>
                <View style={form.btnSubmit}>
                    <Button color={colors.yellow} title="Publicar" onPress={ publish }></Button>
                </View>
            </View>
        </ScrollView>
    );
};





