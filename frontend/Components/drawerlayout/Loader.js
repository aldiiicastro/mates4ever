import React from 'react'
import {ActivityIndicator, Modal, View} from 'react-native'
import {loaderStyle} from "../../styles/LoaderStyles";

export default function Loader(props) {
    const {loading, ...attributes} = props

    return (<Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
            }}>
            <View style={loaderStyle.modalBackground}>
                <View style={loaderStyle.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={true}
                        color="#000000"
                        size="large"
                        style={loaderStyle.activityIndicator}
                    />
                </View>
            </View>
        </Modal>)
}


