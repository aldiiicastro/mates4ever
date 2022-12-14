import {StyleSheet} from "react-native";
import {colors} from "./Colors";

const registerScreenStyle = StyleSheet.create({
    header: {
        backgroundColor: colors.yellow,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SectionStyle: {
        height: 40,
        marginTop: 5,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: colors.white,
        borderWidth: 0,
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
    inputErrorStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: colors.white,
        borderColor: colors.red,
        fontSize: 17,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: colors.white,
        borderColor: colors.violet,
        fontSize: 17,
    },
    errorTextStyle: {
        marginTop: -8,
        color: 'red',
        textAlign: 'center',
        fontSize: 13,
        marginBottom: 3,
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
        backgroundColor: colors.yellow
    },
    contentContainerStyle:{
        justifyContent: 'center',
        alignContent: 'center',
    },

})
export {registerScreenStyle}
