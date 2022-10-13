import React, {useState, createRef} from "react";
import { Form, FormItem, Picker } from 'react-native-form-component'
import {Text, Image, View, TouchableHighlight} from 'react-native';
import {Checkbox} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../styles/Colors";
import { ScrollView } from "react-native-gesture-handler";
import {form} from "../../../styles/Form";
import {style} from "../../../styles/Commons";
import { petScreenStyle } from "../../../styles/PetScreenStyle";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {createPet} from "../../../server/Api.js";
import { handleImagePicked, pickImage } from "../../../server/FirebaseServer";

export default function PetCreation({navigation}) {
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [ageDate, setAgeDate] = useState(new Date());
    const [state, setState] = useState('Adopción');
    const [type, setType] = useState('Perro');
    const [breed, setBreed] = useState('');
    const [vaccine, setVaccine] = useState(false);
    const [castrated, setCastrated] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState('');
    const [description, setDescription] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const nameInputRef = createRef()

    const pickAnImage = async () => {
        const pickerResult = await pickImage()
        console.log(pickAnImage)
        setImage(pickerResult);
        setImageUri(pickerResult.uri);
    }

    const uploadedImage = async () => {
        if (!image){
            return ""
        }
        const uuid = await handleImagePicked(image)
        return uuid
    }
    
    const publish = async () => {
        const pet = {
            'name': name,
            "image": await uploadedImage(),
            'birth': age,
            'state': state,
            'type': type,
            'breed': breed,
            'vaccine': vaccine,
            'castrated': castrated,
            'medicalHistory': medicalHistory,
            'description': description,
            "tutor": "yo",
        }
        console.log(pet)

        createPet(pet).then((response) => {
            console.log(response)
            navigation.navigate('Inicio')
        }).catch((response) => setErrors(response.errors) )
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setAge(getAge(date))
        setAgeDate(date)
        hideDatePicker();
    };

    const getAge = (dateInput) => {
        const dateArray = dateInput.toLocaleDateString().split("/")
        return ([dateArray[1], dateArray[0], dateInput.getFullYear()].join('/'))
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
                <TouchableHighlight onPress={pickAnImage}>
                    {imageUri ?
                    <Image source={{ uri: imageUri }} style={ form.imageSize }/>
                    :
                    <Image source={require('../../../assets/DefaultPet.png')} style={ form.imageSize } />}
                </TouchableHighlight>
                <View style={form.imageIcon} >
                    <Icon name="create" size={28} onPress={pickAnImage}  />
                </View>
            </View>

            <Form 
                GenericInput={'Cargar una mascota'} onButtonPress={() => publish()} 
                buttonStyle={{backgroundColor:colors.violet}} 
                buttonText="Publicar"
                style={[style.marginX, style.bgWhite]}>
                
                <FormItem
                    value={name}
                    label={"Nombre"}
                    onChangeText={setName}
                    showErrorIcon={false}
                    asterik
                    floatingLabel
                    isRequired
                    textInputStyle={form.inputLineBox}
                    onSubmitEditing={() => nameInputRef.current && nameInputRef.current.focus()}
                    ref={nameInputRef}
                    errorBorderColor="white"
                />

                <View style={{ marginHorizontal: 10, marginBottom: 15 }}>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={ageDate}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={[form.inputLineBox]} onPress={showDatePicker}>{age ? age : "Fecha aproximada de nacimiento"}</Text>
                </View>
                
                <Picker
                    items={[
                        { label: 'Adopción', value: 'Adopción' },
                        { label: 'Transito', value: 'Transito' },
                        { label: 'Perdido', value: 'Perdido' },
                    ]}
                    label="Tipo de publicacion"
                    selectedValue={state}
                    onSelection={(item) => setState(item.value)}
                    floatingLabel
                    asterik
                    selectedValueStyle={form.pickerLineBox}
                    labelStyle={{marginStart: 5 }}
                />

                <Picker
                    items={[
                        { label: 'Perro', value: 'Perro' },
                        { label: 'Gato', value: 'Gato' },
                        { label: 'Otro', value: 'Otro' },
                    ]}
                    label="Tipo de animal"
                    selectedValue={type}
                    onSelection={(item) => setType(item.value)}
                    floatingLabel
                    asterik
                    selectedValueStyle={form.pickerLineBox}
                    labelStyle={{marginStart: 5 }}
                />
               
                <FormItem
                    value={breed}
                    label={"Tiene raza? Cual?"}
                    onChangeText={setBreed}
                    showErrorIcon={false}
                    floatingLabel
                    textInputStyle={form.inputLineBox}
                />
               
                <FormItem
                    value={description}
                    label={"Cuentanos un poco sobre " + (name ? name : "el/ella") }
                    onChangeText={setDescription}
                    showErrorIcon={false}
                    textInputStyle={form.inputLineBox}
                    numberOfLines={4}
                    floatingLabel
                    multiline
                />

                <FormItem
                    value={medicalHistory}
                    label={"Tiene algun problema medico? Algo que quieras destacar?"}
                    onChangeText={setMedicalHistory}
                    showErrorIcon={false}
                    textInputStyle={form.inputLineBox}
                    numberOfLines={4}
                    floatingLabel
                    multiline
                />

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

                </Form>


            <View style={[style.marginX, style.bgWhite]}>

        
            </View>
        </ScrollView>
    );
};





