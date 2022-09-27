import { StyleSheet } from "react-native";
import { colors } from "./Colors";


const form = StyleSheet.create({
    inputLineBox: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 1,
        backgroundColor: colors.white,
        margin: 10 ,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerLineBox: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 1,
        backgroundColor: colors.white,
        margin: 10 ,
        color:colors.grey,

    },
    inputFont: {
        fontFamily:"Ebrima",
        color: colors.black,
    },
    btnSubmit: {
        marginVertical: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    alignItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export {form}