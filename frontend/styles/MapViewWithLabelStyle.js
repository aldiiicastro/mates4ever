import {StyleSheet} from "react-native";

const mapViewWithLabelStyle= StyleSheet.create({
    itemsStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
    },
    containersStyle: {
        padding: 5
    },
    itemsTextStyle: {
        color: '#222'
    },
    itemsContainersStyle: {
        maxHeight: 140
    },
    textsInputStyle: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    mapViewStyle: {
        width: "100%",
        height: 200
    }
})

export {mapViewWithLabelStyle}
