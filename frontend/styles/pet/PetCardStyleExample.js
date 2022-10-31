import {StyleSheet} from "react-native"
import {colors} from "../Colors.js"
import {width} from "../Dimension.js"

const petCardStyleExample = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#ffe361",
        width: (width/ 2) - 15,
        margin: 10,
        borderRadius: 2,
        paddingVertical: 3,
    },
    viewState: {
        paddingHorizontal:15,
        backgroundColor: "#ffe361",
        borderRadius: 5,
        position:'absolute',
        right:-2,
        top: -3

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
    textStateLost: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    imageView: {
        height: (width / 2) - 21,
        width: (width / 2) - 21,
        top:0,

    },
    image: {flex: 1, resizeMode: 'contain', width: "100%"},
    textName: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        textTransform: 'capitalize'
    },

})


export {
    petCardStyleExample
}
