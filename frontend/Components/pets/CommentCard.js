import {Image, Linking, Text, TouchableOpacity, View} from "react-native"
import {style} from "../../styles/Commons.js"
import MapView, {Circle, Marker} from "react-native-maps"
import {commentCardStyle} from "../../styles/CommentCardStyle"
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CommentCard({comment}) {

    return (
        <View style={{marginBottom: 10}}>
            {comment.image ?
                <View style={commentCardStyle.imageContainer}>
                    <Image source={{uri: comment.image}} style={commentCardStyle.imageDetail}/>
                </View> : null}
            <View style={commentCardStyle.detailsContainer}>
                <TouchableOpacity style={{marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end'}} onPress={() => Linking.openURL('mailto:' + comment.contact)}>
                    <Icon name={"email"} style={commentCardStyle.emailIcon}/>
                    <Text testID={"pet-details-name"} style={commentCardStyle.commentContact}>{comment.contact}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <View testID={"pet-details-age"} style={style.alignItems}>
                        <Text style={[style.bold, {fontSize: 16}]}>Fecha: </Text>
                        <Text style={{fontSize: 16}}> {comment.dateOfSeen}</Text>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, marginVertical: 10}}>
                    <Text testID={"pet-details-description-field"} style={[style.bold, {fontSize: 18}]}>
                        Comentario:
                    </Text>
                    <Text testID={"pet-details-description"} style={commentCardStyle.descriptionDetail}>
                        {comment.commentary}
                    </Text>
                </View>

                {comment.coordinates && <MapView
                    style={{marginHorizontal: 10, marginTop: 30, height: 200}}
                    initialRegion={{
                        latitude: comment.coordinates.latitude,
                        longitude: comment.coordinates.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    showsUserLocation={true}>
                    <Marker coordinate={comment.coordinates}/>
                    <Circle center={comment.coordinates} radius={1000}/>
                </MapView>}
            </View>
        </View>
    )
}
