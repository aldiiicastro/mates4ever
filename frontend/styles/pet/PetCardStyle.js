import {StyleSheet} from "react-native";
import {colors} from "../Colors";
import {width} from "../Dimension";

const petCardStyle = StyleSheet.create({
    container: {
        height: 190,
        backgroundColor: colors.bg_grey,
        width: width / 2 - 30,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    viewState: {
        height: 25,
        width: 100,
        backgroundColor: colors.yellow,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStateLost: {
        height: 25,
        width: 100,
        backgroundColor: colors.red,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textState: {fontSize: 18, color: colors.violet, fontWeight: 'bold'},
    textStateLost: {fontSize: 18, color: colors.white, fontWeight: 'bold'},
    imageView: {
        height: 100,
        alignItems: 'center',
    },
    image: {flex: 1, resizeMode: 'contain', width: "100%"},
    textName: {fontWeight: 'bold', fontSize: 17, marginTop: 10},
    textAge: {fontSize: 15, fontWeight: 'bold'},
    ageView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    }
})
export {petCardStyle};
