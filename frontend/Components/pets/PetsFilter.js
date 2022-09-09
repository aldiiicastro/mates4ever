import DropDownPicker from "react-native-dropdown-picker";
import dropDownStyle from "./styles/DropDownStyle";
import * as React from "react";
import {useCallback, useState} from "react";
import {View} from "react-native";

export default function PetsFilter() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [petFilterValue, setPetFilterValue] = useState( null );
    const [petFilter, setPetFilter] = useState([
        {label: "Nombre", value: "nombre"},
        {label: "Estado", value: "estado"},
        {label: "Edad", value: "edad"},
        {label: "Tipo", value: "tipo"},
    ])

    const onFilterOpen = () => {
        setFilterOpen(true);
    }

    return(
                <DropDownPicker
                    style={dropDownStyle.dropdown}
                    open={filterOpen}
                    items={petFilter}
                    setOpen={setFilterOpen}
                    setValue={setPetFilterValue}
                    setItems={setPetFilter}
                    placeholder="Seleccionar filtro"
                    placeholderStyle={dropDownStyle.placeholderStyles}
                    onOpen={onFilterOpen}
                    zIndex={3000}
                    zIndexInverse={1000}/>
        )
}