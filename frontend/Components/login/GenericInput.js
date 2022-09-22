import {registerScreenStyle} from "../../styles/RegisterScreenStyle";
import {TextInput, View} from "react-native";

export default function GenericInput(props) {
    return(
        <View style={registerScreenStyle.SectionStyle}>
            <TextInput
                style={registerScreenStyle.inputStyle}
                onChangeText={props.onChange}
                underlineColorAndroid="#f000"
                placeholder={props.placeHolder}
                placeholderTextColor="rgba(160,122,190,0.76)"
                autoCapitalize="sentences"
                returnKeyType="next"
                keyboardType={props.keyboardType}
                onSubmitEditing={props.inputRef}
                blurOnSubmit={false}
                ref={props.reference}
            />
        </View>
    )
}
