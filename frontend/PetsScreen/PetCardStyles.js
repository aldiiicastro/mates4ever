import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container_yellow:{
        flex: 1,
        marginBottom: 10,
        backgroundColor: "rgba(250,235,161,0.56)",
        justifyContent: "center",
        alignItems: "center",
    },
    container_red:{
        flex: 1,
        marginBottom: 10,
        backgroundColor:"rgba(236,45,45,0.56)",
        justifyContent: "center",
        alignItems: "center",
    },
    card_template:{
        width: 250,
        height: 250,
    },
    card_image: {
        width: 400 ,
        height: 300,
        borderRadius : 10
    },
    text_container_grey:{
        position: "absolute",
        width: 400,
        height: 30,
        bottom:0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius: 10
    },
    card_title: {
       textAlign: "center"
    },
    card_text: {
       color: "white"
    },
});

export default styles