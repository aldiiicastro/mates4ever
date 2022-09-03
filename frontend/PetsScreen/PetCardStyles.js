import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 10,
        backgroundColor: "#faeba1",
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
    text_container_red:{
        position: "absolute",
        width: 400,
        height: 30,
        bottom:0,
        padding: 5,
        backgroundColor: "red",
        borderBottomLeftRadius : 10,
        borderBottomRightRadius: 10
    },
    card_title: {
        color: "white",
    },
});

export default styles