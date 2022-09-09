import {StyleSheet} from "react-native";

const colors = {
    red : "rgb(171,72,72)",
    yellow : "rgb(250,235,161)",
    transBlack: "rgba(0,0,0, 0.3)",
    white: "rgb(255,255,255)"
}

const petCardStyle = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 10,
        marginLeft: 10,
        width: 400 ,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
    },
    container_backGround_red:{
        backgroundColor: colors.red,
    },
    container_backGround_yellow:{
        backgroundColor: colors.yellow,
    },
    card_image: {
        width: 380 ,
        height: 300,
        borderRadius : 40,
        marginBottom: 8,
    },
    text_container_grey:{
        position: "absolute",
        width: 380,
        height: 30,
        bottom:0,
        padding: 3,
        backgroundColor: colors.transBlack,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    card_title: {
       textAlign: "center"
    },
    card_text: {
        color: colors.white,
        fontSize: 18,
        paddingLeft: 10
    },
});

export default petCardStyle