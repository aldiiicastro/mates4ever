import {StyleSheet} from "react-native";

const contactCardStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    column: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        fontSize: 25,
        color: "#ffb612"
    },

    row: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contactText: {
        fontSize: 19,
    },
    iconRow: {
        marginVertical: 10,
        marginRight: -15,
        flex: 2,
        alignItems: 'center',
    },
})

export {
    contactCardStyles
}
