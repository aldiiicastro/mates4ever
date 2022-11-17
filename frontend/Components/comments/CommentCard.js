import {Image, Linking, Text, TouchableOpacity, View} from "react-native"
import {style} from "../../styles/Commons.js"
import {commentCardStyle} from "../../styles/CommentCardStyle"
import Icon from "react-native-vector-icons/MaterialIcons";
import SavedMapView from "../SavedMapView";

export default function CommentCard({comment, index}) {

    return (
        <View style={{marginTop: 10, marginHorizontal: 12, borderRadius: 20}} key={index}>
            <View style={commentCardStyle.detailsContainer}>
                {comment.image ?
                    <View style={commentCardStyle.imageContainer}>
                        <Image source={{uri: comment.image}} style={commentCardStyle.imageDetail}/>
                    </View> : null}
                <TouchableOpacity style={{marginLeft: 20, flexDirection: 'row', alignItems: 'flex-end'}}
                                  onPress={() => Linking.openURL('mailto:' + comment.contact)}>
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
                {comment.coordinates.latitude && <SavedMapView param={comment}/>}
            </View>
        </View>
    )
}
