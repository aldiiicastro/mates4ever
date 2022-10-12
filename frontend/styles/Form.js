import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./Colors";


const form = StyleSheet.create({
    imageSize:{
        width: Dimensions.get('window').width - 75,
        height: Dimensions.get('window').width - 95,

    },
    input: {
        width: Dimensions.get('window').width-75,
        height: 40,
        borderColor: colors.grey,
    },
    image:{
        marginHorizontal: 30,
        paddingVertical : 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageIcon:{
        position:"absolute",
        bottom:0,
        right:0,
        backgroundColor: colors.light_violet,
        padding: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
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
        color: colors.black,
    },
    btnSubmit: {
        marginVertical: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.yellow,

    },
    alignItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 20,
        marginLeft: 10
      }
});

export {form}
