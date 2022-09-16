import {StyleSheet} from "react-native";

const colors = {
    red : "rgb(171,72,72)",
    ligth_yellow : "rgb(250,235,161)",
    transBlack: "rgba(0,0,0, 0.3)",
    white: "rgb(255,255,255)",
    yellow: "#ffdf4c",
    bg_grey: "#f2f2f2"
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
        backgroundColor: colors.ligth_yellow,
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
const petDetails = StyleSheet.create({
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

    detailsContainer: {
      flex: 1,
      backgroundColor: colors.bg_grey,
      marginHorizontal: 12,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: 10,
      paddingBottom: 30,
      paddingTop: 30,
    },
 
    tag: {
      backgroundColor: colors.yellow,
      width: 90,
      height: 40,
      justifyContent: 'center',
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
  });

export {
    petCardStyle,
    petDetails
}
