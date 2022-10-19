import {Image, View} from "react-native";
import {imageViewStyle} from "../../styles/ImageViewStyle";

export default function ImageView() {
    return (
        <View style={imageViewStyle.imageView}>
            <Image source={require('../../assets/icono.png')} style={imageViewStyle.imageStyle}/>
        </View>
    )
}
