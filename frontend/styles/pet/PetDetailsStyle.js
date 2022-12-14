import {StyleSheet} from "react-native"
import {colors} from "../Colors"
import {width, height} from "../Dimension"

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
    finish: {
        marginLeft: width - 200,
        backgroundColor: colors.yellow
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: colors.bg_grey,
        // marginHorizontal: 6,
        width: width - 25,
        borderRadius: 20,
        marginTop: -10,
        paddingBottom: 30,
        paddingTop: 30,
        minHeight: height - (width + 30)
    },

    descriptionDetail: {
        color: 'grey',
        fontSize: 16,
        lineHeight: 22,
    },

    tag: {
        backgroundColor: colors.yellow,
        width: width - 505,
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
        width: width - 30,
        height: width - 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 100
    },
    modalView: {
        borderRadius: 20, alignItems: "center",
    },
    button: {
        borderRadius: 20, padding: 10, elevation: 2, marginBottom: 10
    },
    buttonClose: {
        backgroundColor: colors.yellow,
    },
    textStyle: {
        color: colors.violet, fontWeight: "bold", textAlign: "center"
    },
    modalText: {
        marginBottom: 15, textAlign: "center"
    },
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    contactColor: {
        color: '#fff'
    }
})
export {petDetailsStyle}
