import {StyleSheet} from "react-native";
import {width} from "../Dimension";
import {colors} from "../Colors";

const petsStatesStyle = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        width: width - 100,
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 16,
        color: colors.grey,
        fontWeight: 'bold'
    },
    categoryTextSelected: {
        color: colors.violet,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: colors.yellow,
    },
    contentContainerStyle: {
        marginTop: 10,
        paddingBottom: 50,
    }
})
export {petsStatesStyle};
