import { size } from "lodash";
import {StyleSheet} from "react-native";
import { Title } from "react-native-paper";
import {colors} from "./Colors";
import {width, height} from "./Dimension";

const filterStyle = StyleSheet.create({
    categoryView:{
        padding:10,
    },
    categoryTitle:{
        fontSize:15
    },
    button:{
        padding:10,
    },
    buttonsFilter:{
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    filterModal:{
        marginTop: 150,
        width: width - 150,
        maxHeight: height -200, 
        backgroundColor: "white",
        borderRadius:7,
        paddingVertical: 10,
        // elevation: 50
    },
    principalDivider:{
        height:2.4,
        shadowColor: "#000000",
        shadowOpacity: 50,
        shadowRadius: 2,
        shadowOffset: {
            height: 5,
            width: 1
        },
        elevation: 5
    },
    rightView: {
        left: width - (width - 140)
    },
    secondaryDivider:{
        height:2,
        shadowColor: "#000",
    },
    title:{
        padding:10,
        fontSize:17
    }
    
})


export {filterStyle}
