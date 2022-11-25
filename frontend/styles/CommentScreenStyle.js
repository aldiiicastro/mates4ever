import {StyleSheet} from "react-native"
import {width} from "./Dimension";
import {colors} from "./Colors";

const commentScreenStyle = StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image:{
        marginHorizontal: 30,
        paddingVertical : 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageSize:{
        width: width - 75,
        height: width - 95,

    },
    imageIcon:{
        position:"absolute",
        bottom:0,
        right:0,
        backgroundColor: colors.light_violet,
        padding: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    formButtonStyle: {
        backgroundColor: colors.violet
    }
})

export {commentScreenStyle}
