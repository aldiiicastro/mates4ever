import {StyleSheet} from "react-native";
import {colors} from "./Colors";

const registerScreenStyle = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 5,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: colors.yellow,
        borderWidth: 0,
        borderColor: colors.yellow,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 5,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: colors.violet,
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: colors.violet,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: colors.grey,
        fontSize: 17,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: colors.violet,
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
    imageSuccessfulView: {
        flex: 1,
        backgroundColor: colors.beige,
        justifyContent: 'center',
    },
    unsuccessfulView: {
        flex: 1,
        backgroundColor: colors.beige
    },
    contentContainerStyle:{
        justifyContent: 'center',
        alignContent: 'center',
    },

})
export {registerScreenStyle}
