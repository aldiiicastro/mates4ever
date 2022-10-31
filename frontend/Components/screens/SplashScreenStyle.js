import {StyleSheet} from "react-native";
import {colors} from "../../styles/Colors";

export const splashScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.yellow,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
})
