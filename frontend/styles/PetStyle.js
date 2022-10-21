import {Dimensions, StyleSheet} from "react-native"
import {colors} from "./Colors.js"
import {width} from "./Dimension.js"

const petCardStyle = StyleSheet.create({
    container: {
        height: 190,
        backgroundColor: colors.bg_grey,
        width: width/ 2 - 30,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    viewState: {
        height: 25,
        width: 100,
        backgroundColor: colors.yellow,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewStateLost: {
        height: 25,
        width: 100,
        backgroundColor: colors.red,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textState: {fontSize: 18, color: colors.violet, fontWeight: 'bold'},
    textStateLost: {fontSize: 18, color: colors.white, fontWeight: 'bold'},
    imageView: {
        height: 100,
        alignItems: 'center',
    },
    image: {flex: 1, resizeMode: 'contain', width: "100%"},
    textName: {fontWeight: 'bold', fontSize: 17, marginTop: 10},
    textAge: {fontSize: 15, fontWeight: 'bold'},
    ageView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    }
})

const petCardStyleExample = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#ffe361",
        width: (width/ 2) - 15,
        margin: 10,
        borderRadius: 2,
        paddingVertical: 3,
    },
    viewState: {
        paddingHorizontal:15,
        backgroundColor: "#ffe361",
        borderRadius: 5,
        position:'absolute',
        right:-2,
        top: -3

    },
    viewStateLost: {
        height: 25,
        width: 100,
        backgroundColor: colors.red,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textState: {fontSize: 18, color: colors.violet, fontWeight: 'bold'},
    textStateLost: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    imageView: {
        height: (width / 2) - 21,
        width: (width / 2) - 21,
        top:0,

    },
    image: {flex: 1, resizeMode: 'contain', width: "100%"},
    textName: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        textTransform: 'capitalize'
    },

})


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
      minHeight: Dimensions.get('window').height - (Dimensions.get('window').width + 30)
    },
    
    descriptionDetail:{
        color: 'grey',
        fontSize: 16,
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

    floatButton:{
        backgroundColor: colors.violet,
        position:"absolute",
        bottom: 15,
        right: 10,
        padding: 10,
        borderRadius: 50,
    },

    imageDetail:{
        resizeMode: 'cover',
        flex: 1,
        width: Dimensions.get('window').width - 30,
        height: Dimensions.get('window').width - 30
    }
  })

const petsStatesStyle = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        width: width - 100,
        marginTop: 30,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 16,
        color: colors.grey,
        fontWeight: 'bold'},
    categoryTextSelected: {
        color: colors.violet,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: colors.yellow,
    },
    contentContainerStyle: {
        marginTop: 10,
        paddingBottom: 50,
    }
})

export {
    petCardStyle,
    petDetails,
    petsStatesStyle,
    petCardStyleExample
}
