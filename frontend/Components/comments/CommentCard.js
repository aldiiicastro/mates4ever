import {FlatList, Image, Linking, Text, TouchableOpacity, View} from "react-native"
import {style} from "../../styles/Commons.js"
import {commentCardStyle} from "../../styles/CommentCardStyle"
import Icon from "react-native-vector-icons/MaterialIcons";
import SavedMapView from "../map/SavedMapView";
import React from "react";

export default function CommentCard({comment, index}) {

    return (
        <View style={commentCardStyle.containerView} key={index}>
            <View style={commentCardStyle.detailsContainer}>
                {comment.image ?
                    <View style={commentCardStyle.imageContainer}>
                        <FlatList horizontal={true} data={comment.image} renderItem={(item) => {
                            return <Image source={{uri: item.item}} style={commentCardStyle.imageDetail}/>
                        }}/>
                    </View> : null}
                <TouchableOpacity style={commentCardStyle.mailStyle}
                                  onPress={() => Linking.openURL('mailto:' + comment.contact)}>
                    <Icon name={"email"} style={commentCardStyle.emailIcon}/>
                    <Text testID={"pet-details-name"} style={commentCardStyle.commentContact}>{comment.contact}</Text>
                </TouchableOpacity>
                <View
                    style={commentCardStyle.dateOfSeenStyle}>
                    <View testID={"pet-details-age"} style={style.alignItems}>
                        <Text style={[style.bold, commentCardStyle.font16]}>Fecha: </Text>
                        <Text style={commentCardStyle.font16}> {comment.dateOfSeen}</Text>
                    </View>
                </View>
                <View style={commentCardStyle.commentStyle}>
                    <Text testID={"pet-details-description-field"} style={[style.bold, commentCardStyle.font18]}>
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
