import {StyleSheet} from "react-native";
import {colors} from "./Colors";
import {width} from "./Dimension";

const commentCardStyle = StyleSheet.create({
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
    commentContact: {
        fontSize: 15,
        marginLeft: 3,
        marginBottom: 3,
        fontWeight: 'bold',
        color: colors.violet
    },
    emailIcon: {
        fontSize: 25,
        color: colors.violet
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: colors.yellowLight,
        borderRadius: 20,
        paddingBottom: 30,
        paddingTop: 20,
        minHeight: 100
    },

    descriptionDetail: {
        color: colors.black,
        fontSize: 18,
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
        borderRadius: 10,
        width: width - 250,
        height: width - 250
    },
    contentContainerStyle: {
        marginTop: 5
    },
    containerView: {
        marginTop: 10,
        marginHorizontal: 12,
        borderRadius: 20
    },
    mailStyle: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    dateOfSeenStyle: {
        marginLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    commentStyle: {
        paddingHorizontal: 20,
        marginVertical: 10
    },
    font16: {
        fontSize: 16
    },
    font18: {
        fontSize: 18
    }
})
export {commentCardStyle}
