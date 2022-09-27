import {Dimensions, StyleSheet} from "react-native";
import {colors} from "./Colors";

const style = StyleSheet.create({
    fullContainer: {
        width : Dimensions.get('window').width
    },
    container: {
        width : Dimensions.get('window').width - 40,
    },
    marginX: {
        marginHorizontal: 20,
        marginBottom: 50,
        marginTop: 10
    },
    bgWhite: {
        backgroundColor: colors.white

    },
    titleText: {
        marginStart: 10,
        fontSize: 25,
        color: colors.yellow,
        fontWeight: 'bold',
    },

});

export {style}
