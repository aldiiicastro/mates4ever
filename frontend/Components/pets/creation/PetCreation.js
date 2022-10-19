import React, {useState, createRef} from "react"
import {Form, FormItem} from 'react-native-form-component'
import {ScrollView} from "react-native-gesture-handler"

import {style} from "../../../styles/Commons"
import {form} from "../../../styles/Form"
import {colors} from "../../../styles/Colors"

import {createPet} from "../../../server/Api.js"
import {handleImagePicked, pickImage} from "../../../server/FirebaseServer"
import Loader from "../../Loader"
import Back from "../../drawerlayout/Back"
import {
    CalendarForm,
    ImageForm,
    MultiLineLabel,
    SimpleCheckBox,
    SimpleLineLabel,
    SimpleLinePicker
} from "../../drawerlayout/FormItemGeneric"
import {petScreenStyle} from "../../../styles/PetScreenStyle"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function PetCreation({navigation}) {
    const [image, setImage] = useState(null)
    const [imageUri, setImageUri] = useState(null)
    const [name, setName] = useState('')
    const [age, setAge] = useState(null)
    const [ageDate, setAgeDate] = useState(new Date())
    const [state, setState] = useState('Adopción')
    const [type, setType] = useState('Perro')
    const [breed, setBreed] = useState('')
    const [vaccine, setVaccine] = useState(false)
    const [castrated, setCastrated] = useState(false)
    const [medicalHistory, setMedicalHistory] = useState('')
    const [description, setDescription] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setErrors] = useState('')
    const nameInputRef = createRef()

    const pickAnImage = async () => {
        const pickerResult = await pickImage()
        setImage(pickerResult)
        setImageUri(pickerResult.uri)
    }

    const uploadedImage = async () => {
        if (!image) {
            return ""
        }
        const uuid = await handleImagePicked(image)
        return uuid
    }

    const publish = async () => {
        setLoading(true)

        const userEmail = await AsyncStorage.getItem('user_id')
        const image = await uploadedImage()

        const pet = {
            'name': name,
            "image": image,
            'birth': age,
            'state': state,
            'type': type,
            'breed': breed,
            'vaccine': vaccine,
            'castrated': castrated,
            'medicalHistory': medicalHistory,
            'description': description,
            "tutor": userEmail,
        }

        console.log(pet)

        createPet(pet).then((response) => {
            navigation.navigate('Inicio')
        }).catch((response) => {
            setErrors(response.errors)
        })

        setLoading(false)
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (date) => {
        setAge(getAge(date))
        setAgeDate(date)
        hideDatePicker()
    }

    const getAge = (dateInput) => {
        const dateArray = dateInput.toLocaleDateString().split("/")
        return ([dateArray[1], dateArray[0], dateInput.getFullYear()].join('/'))
    }
    return (
        <ScrollView style={style.fullContainer}>
            <Loader loading={loading}/>
            <Back onPress={() => navigation.goBack()} text="Cargar una mascota" headerStyle={petScreenStyle.header}/>

            <ImageForm
                imageUri={imageUri}
                onPress={pickAnImage}
            />

            <Form
                GenericInput={'Cargar una mascota'} onButtonPress={() => publish()}
                buttonStyle={{backgroundColor: colors.violet}}
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
                {/* <RequiredLineLabel
                    value = {name}
                    label = "Nombre"
                    onChangeText = {setName}
                    ref = {nameInputRef}
                    inputRef={nameInputRef.current && nameInputRef.current.focus()}
                /> */}

                <CalendarForm
                    isVisible={isDatePickerVisible}
                    date={ageDate}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    dateText={age}
                    defaultText="Fecha aproximada de nacimiento"
                    onPress={showDatePicker}

                />

                <SimpleLinePicker
                    items={[
                        {label: 'Adopción', value: 'Adopción'},
                        {label: 'Transito', value: 'Transito'},
                        {label: 'Perdido', value: 'Perdido'},
                    ]}
                    label="Tipo de publicacion"
                    selectedValue={state}
                    onSelection={(item) => setState(item.value)}
                />
                <SimpleLinePicker
                    items={[
                        {label: 'Perro', value: 'Perro'},
                        {label: 'Gato', value: 'Gato'},
                        {label: 'Otro', value: 'Otro'},
                    ]}
                    label="Tipo de animal"
                    selectedValue={type}
                    onSelection={(item) => setType(item.value)}
                />

                <SimpleLineLabel
                    value={breed}
                    label={"Tiene raza? Cual?"}
                    onChangeText={setBreed}
                />

                <MultiLineLabel
                    value={description}
                    label={"Cuentanos un poco sobre " + (name ? name : "el/ella")}
                    onChangeText={setDescription}
                />

                <MultiLineLabel
                    value={medicalHistory}
                    label={"Tiene algun problema medico? Algo que quieras destacar?"}
                    onChangeText={setMedicalHistory}
                />

                <SimpleCheckBox
                    status={vaccine ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setVaccine(!vaccine)
                    }}
                />

                <SimpleCheckBox
                    status={castrated ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setCastrated(!castrated)
                    }}
                />
            </Form>
        </ScrollView>
    )
}





