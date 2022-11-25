import {StyleSheet} from "react-native";
import {colors} from "./Colors";
import {width, height} from "./Dimension";

const lostPetsStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: width - 40,
        height: height - 40,
        backgroundColor: "white",
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.violet,
    },
    modalTitle: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconHideModal: {
        color: colors.grey
    },
    mapViewStyle : {
        width: "100%",
        height: "90%"
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
})

export {lostPetsStyle}
