import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import Icon from "react-native-vector-icons/MaterialIcons"
import {contactCardStyles} from "../../styles/ContactCardStyles";


export default function ContactCard({containerStyle, onPress, contact, icon}) {
    return (
        <TouchableOpacity onPress={() => onPress(contact)}>
            <View style={[contactCardStyles.container, containerStyle]}>
                <View style={contactCardStyles.iconRow}>
                    <Icon
                        name={icon}
                        style={contactCardStyles.emailIcon}
                    />
                </View>
                <View style={contactCardStyles.row}>
                    <View style={contactCardStyles.column}>
                        <Text testID={`${icon}`} style={contactCardStyles.contactText}>{contact}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

ContactCard.propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    icon: PropTypes.string.isRequired
}

ContactCard.defaultProps = {
    containerStyle: {},
    name: null,
}
