import * as React from "react";
import {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, SafeAreaView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {Checkbox} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
const COLORS = {
    white: '#fff',
    dark: '#000',
    red: '#F52A2A',
    light: '#F1F1F1',
    green: "#ffdf4c",
};
export default function PetCreation({navigation}) {
    const [age, setAge] = useState('Año');
    const [state, setState] = useState('Adopción');
    const [isSelected, setSelection] = useState(false);

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white, width: "100%"}}>
            <Icon name="arrow-back" size={25} style={{ marginTop:15}} onPress={() => navigation.goBack()}/>
            <View style={{marginTop: 30, flexDirection: 'column'}}>
                <Text style={{fontSize: 30, color: COLORS.green, fontWeight: 'bold'}}>Cargar una mascota</Text>
                <View style={style.searchContainer}>
                    <TextInput style={style.input}
                               placeholder="Nombre" />
                </View>
                <View  style={style.searchContainer}>
                    <TextInput style={style.input}
                        secureTextEntry={true}
                        placeholder="Edad en números"
                    />
                </View>
                <View >
                    <Picker
                        style={{backgroundColor: COLORS.light, marginTop: 2}}
                        selectedValue={age}
                        onValueChange={currentAge => setAge(currentAge)}>
                        <Picker.Item label="Año" value="Año" />
                        <Picker.Item label="Meses" value="Meses" />
                    </Picker>
                    <Text>
                        Seleccionado: {age}
                    </Text>
                </View>
                <View  style={style.searchContainer}>
                    <TextInput style={style.input}
                               secureTextEntry={true}
                               placeholder="Raza"
                    />
                </View>
                <View  style={style.searchContainer}>
                    <TextInput style={style.input}
                               secureTextEntry={true}
                               placeholder="Foto"
                    />
                </View>
                <View >
                    <Picker
                        style={{backgroundColor: COLORS.light, marginTop: 2}}
                        selectedValue={state}
                        onValueChange={currentState => setState(currentState)}>
                        <Picker.Item label="Adopción" value="Adopción" />
                        <Picker.Item label="Transito" value="Transito" />
                        <Picker.Item label="Perdido" value="Perdido" />
                    </Picker>
                    <Text>
                        Seleccionado: {state}
                    </Text>
                </View>
                <View style={style.checkboxContainer}>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={style.checkbox}
                    />
                    <Text style={style.label}>¿Tiene las vacunas al día?</Text>
                </View>
                <View style={style.checkboxContainer}>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={style.checkbox}
                    />
                    <Text style={style.label}>¿Esta castrado?</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    searchContainer: {
        height: 60,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});



