import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import Icon from "react-native-vector-icons/MaterialIcons"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    column: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        fontSize: 25,
        color: "#ffb612"
    },

    row: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    contactText: {
        fontSize: 19,
    },
    iconRow: {
        marginVertical: 10,
        marginRight: -15,
        flex: 2,
        alignItems: 'center',
    },
})

const ContactCard = ({containerStyle, onPress, contact, icon}) => (
    <TouchableOpacity onPress={() => onPress(contact)}>
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconRow}>
                <Icon
                    name={icon}
                    style={styles.emailIcon}
                />
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.contactText}>{contact}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

ContactCard.propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    contact: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

ContactCard.defaultProps = {
    containerStyle: {},
    name: null,
}

export default ContactCard
