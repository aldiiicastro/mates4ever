import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./Colors";


const form = StyleSheet.create({
    
    btnSubmit: {
        marginVertical: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.yellow,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 20,
        marginLeft: 10
      },
    input: {
        width: Dimensions.get('window').width-75,
        height: 40,
        borderColor: colors.grey,
    },
    inputFont: {
        color: colors.black,
    },
    inputLineBox: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
    imageSize:{
        width: Dimensions.get('window').width - 75,
        height: Dimensions.get('window').width - 95,

    },
    pickerLineBox: {
        width: Dimensions.get('window').width - 100,
        borderBottomColor: colors.grey,
        borderBottomWidth: 1,
        marginBottom: 10 ,
        paddingTop: 30,
        height: 50,
        color:colors.grey,

    },
    textBold:{
        fontWeight: 'bold'
    },
    ps5:{
        paddingStart: 5
    }
});

export {form}
