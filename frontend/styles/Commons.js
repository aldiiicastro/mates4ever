import {Dimensions, StyleSheet} from "react-native";
import {colors} from "./Colors";
import { height } from "./Dimension";

const style = StyleSheet.create({
    fullContainer: {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').height
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
    bgYellow: {
        backgroundColor: colors.yellow
    },
    titleText: {
        marginStart: 10,
        fontSize: 25,
        color: colors.yellow,
        fontWeight: 'bold',
    },
    floatButton:{
        backgroundColor: colors.yellow,
        // position:"absolute",
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 65,
        bottom: 5,
        borderRadius: 100,
    },
    alignItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    bold: {
        fontWeight: 'bold'
    },

});

export {style}
