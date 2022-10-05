import {FormItem} from "react-native-form-component";
import React from "react";

export default function FormItemGeneric(props) {
    return(
            <FormItem
                value={props.value}
                label={props.label}
                onChangeText={props.onChange}
                onSubmitEditing={props.inputRef}
                showErrorIcon={false}
                ref={props.ref}
                keyboardType={props.keyboardType}
                customValidation={props.customValidation}
                asterik
                floatingLabel
                isRequired
            />
    )
}
