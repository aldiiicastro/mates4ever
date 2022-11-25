import {Dimensions, StyleSheet} from "react-native";
import {colors} from "./Colors";

const loginScreenStyle = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.yellow,
        alignContent: 'center',
        width: Dimensions.get('window').width
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
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
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: colors.violet,
        fontWeight: "bold",
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
        borderColor: 'grey',
        fontSize: 17,
    },
    registerTextStyle: {
        color:  colors.violet,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    titleText: {
        fontSize: 25,
        color: colors.yellow,
        fontWeight: 'bold',
    },
    mainViewStyle: {
        flex: 1,
        backgroundColor:
        colors.yellow,
        padding: 24
    },
    keyboardStyle: {
        flex: 1
    },
    formButtonStyle: {
        backgroundColor: colors.violet
    },
    safeAreaStyle: {
        flex: 1
    },
    contentContainersStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    }

});

export {loginScreenStyle}
