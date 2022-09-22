import {Keyboard, TextInput, View} from "react-native";
import {registerScreenStyle} from "../../styles/RegisterScreenStyle";

export default function PasswordInput(props) {
    return(
        <View style={registerScreenStyle.SectionStyle}>
            <TextInput
                style={registerScreenStyle.inputStyle}
                onChangeText={props.onChange}
                underlineColorAndroid="#f000"
                placeholder="Ingresar contraseña"
                placeholderTextColor="rgba(160,122,190,0.76)"
                ref={props.passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
            />
        </View>
    )
}
