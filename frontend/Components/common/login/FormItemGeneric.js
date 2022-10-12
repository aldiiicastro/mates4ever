import {FormItem} from "react-native-form-component";
import React, {forwardRef} from "react";

const FormItemGeneric = forwardRef(({ ...props }, ref) => {
    return(
            <FormItem
                value={props.value}
                label={props.label}
                onChangeText={props.onChange}
                onSubmitEditing={props.inputRef}
                ref={ref}
                keyboardType={props.keyboardType}
                showErrorIcon={false}
                asterik
                floatingLabel
                isRequired
            />
    )
})

export default FormItemGeneric
