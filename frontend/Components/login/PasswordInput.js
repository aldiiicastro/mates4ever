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
                placeholderTextColor="grey"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                ref={props.passwordInputRef}
                secureTextEntry={true}
            />
        </View>
    )
}
