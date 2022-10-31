import {Dimensions, StyleSheet} from "react-native";
import {colors} from "../Colors";

const petDetailsStyle = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    detailsContainer: {
        flex: 1,
        backgroundColor: colors.bg_grey,
        marginHorizontal: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
        paddingBottom: 30,
        paddingTop: 30,
        minHeight: Dimensions.get('window').height - (Dimensions.get('window').width + 30)
    },

    descriptionDetail: {
        color: 'grey',
        fontSize: 16,
        lineHeight: 22,
    },

    tag: {
        backgroundColor: colors.yellow,
        width: 90,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },

    floatButton: {
        backgroundColor: colors.violet,
        position: "absolute",
        bottom: 15,
        right: 10,
        padding: 10,
        borderRadius: 50,
    },

    imageDetail: {
        resizeMode: 'cover',
        flex: 1,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').width - 30
    }
})
export {petDetailsStyle};
