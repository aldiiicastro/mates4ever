import {FormItem, Picker} from "react-native-form-component"
import React, {createRef, forwardRef} from "react"
import {Text, TouchableHighlight, View, Image} from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import {Checkbox} from "react-native-paper"
import {form} from "../../styles/Form"
import {style} from "../../styles/Commons"
import {colors} from "../../styles/Colors"
import Slider from "@react-native-community/slider"
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps"

export const FormItemGeneric = forwardRef(({...props}, ref) => {
    return (
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

export const SimpleLineLabel = forwardRef(({...props}, ref) => {
    return (
        <FormItem
            value={props.value}
            label={props.label}
            onChangeText={props.onChangeText}
            showErrorIcon={false}
            textInputStyle={form.inputLineBox}
            floatingLabel
        />
    )
})

export const MultiLineLabel = forwardRef(({...props}, ref) => {
    return (
        <FormItem
            value={props.value}
            label={props.label}
            onChangeText={props.onChangeText}
            showErrorIcon={false}
            textInputStyle={form.inputLineBox}
            numberOfLines={4}
            floatingLabel
            multiline
        />
    )
})
export const MultiLineLabelRequired = forwardRef(({...props}, ref) => {
    return (
        <FormItem
            value={props.value}
            label={props.label}
            onChangeText={props.onChangeText}
            showErrorIcon={false}
            textInputStyle={form.inputLineBox}
            ref={ref}
            numberOfLines={4}
            floatingLabel
            asterik
            multiline
            isRequired
        />
    )
})




export const RequiredLineLabel = forwardRef((props, ref) => {
    return (
        <FormItem
            value={props.value}
            label={props.label}
            onChangeText={props.onChangeText}
            onSubmitEditing={props.inputRef}
            ref={ref}
            errorBorderColor="white"
            textInputStyle={form.inputLineBox}
            showErrorIcon={false}
            asterik
            floatingLabel
            isRequired
        />

    )
})

export const SimpleLinePicker = (props) => {
    return (
        <Picker
            testID={'testIDD'}
            items={props.items}
            label={props.label}
            selectedValue={props.selectedValue}
            onSelection={props.onSelection}
            asterik
            selectedValueStyle={form.pickerLineBox}
            labelStyle={{marginStart: 5}}
        />
    )
}

export const SimpleCheckBox = (props) => {
    return (
        <View style={style.alignItems}>
            <Checkbox
                color={colors.yellow}
                status={props.status}
                onPress={props.onPress}
                testID={props.testID}
                key={props.key}
            />
            <Text style={style.label}>{props.text}</Text>
        </View>
    )
}

export const ImageForm = (props) => {
    return (
        <View style={form.image} on>
            <TouchableHighlight onPress={props.onPress} testID={'image-create'}>
                <Image source= {props.imageUri ? {uri: props.imageUri } : require('../../assets/DefaultPet.png')} style={form.imageSize}/>
            </TouchableHighlight>
            <View style={form.imageIcon}>
                <Icon name="create" size={28} onPress={props.onPress} />
            </View>
        </View>
    )
}


export const EmptyImage = (props) => {
    return (
        <View>
            <TouchableHighlight onPress={props.onPress} testID={'image-create'}>
                <Image source= {require('../../assets/DefaultPet.png')} style={form.imageSize}/>
            </TouchableHighlight>
        </View>
    )
}

export const CalendarForm = (props) => {
    return (
        <View style={{marginHorizontal: 10, marginBottom: 25}}>
            <DateTimePickerModal
                isVisible={props.isVisible}
                mode="date"
                date={props.date}
                onConfirm={props.onConfirm}
                onCancel={props.onCancel}
            />
            <View style={form.inputLineBox}>
                <Text
                    style={props.dateText ? form.ps5 : form.textBold}
                    onPress={props.onPress}
                >
                    {props.dateText ? props.dateText : props.defaultText}
                </Text>
            </View>
        </View>
    )
}

export const SlideCondicionalCheker = (props) => {

    return (
        <View>
            <SimpleCheckBox
                status={props.status}
                onPress={props.onPress}
                text={props.text}
            />
            <Text>{props.valueText}</Text>
            <Slider
                // style={}
                minimumValue={props.minimumValue}
                maximumValue={props.maximumValue}
                step={props.step}
                minimumTrackTintColor={colors.yellow}
                maximumTrackTintColor={colors.yellow}
                thumbTintColor={colors.yellow}
                disabled={props.disabled}
                onValueChange= { props.onValueChange }

            />
        </View>
    )
}

