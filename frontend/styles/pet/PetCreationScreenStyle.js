import {StyleSheet} from "react-native";
import {colors} from "../Colors.js";
import {width} from "../Dimension.js";

const petCreationScreenStyle = StyleSheet.create({
    header: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.violet,
    },
    titleText: {
        // marginTop: -25,
        fontSize: 25,
        color: colors.yellow,
        fontWeight: 'bold',
        width: width-40

    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    searchContainer: {
        height: 50,
        backgroundColor: colors.bg_grey,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchView: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconSearch: {
        marginLeft: 20,
    },
    iconClose: {
        marginLeft: 20,
        marginRight: 10,
        color: colors.grey
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: colors.black,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: colors.violet,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSrt : {
        color: colors.white,
    },
    safeAreaView: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

export {
    petCreationScreenStyle
}

