import {StyleSheet, TextInput, Text} from "react-native";
import MapView, {Circle, Marker} from "react-native-maps";
import {mapViewWithLabelStyle} from "../../styles/MapViewWithLabelStyle";
import React from "react";

const styles = StyleSheet.create({
    sContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    sTextItem: {
        height: 50,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18
    },
    sSearchBar: {
        paddingHorizontal: 10,
        margin: 10,
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        fontSize: 18
    }
});

export default function MapViewWithLabel({close, region, onSelected, onChangeText, locations, location, onPressMap, onDragMarker}) {
    let {sSearchBar, sTextItem } = styles;
    return(
      <React.Fragment>
          <TextInput
              style={sSearchBar}
              placeholder={location.name}
              onChangeText={(text) => onChangeText(text)}
          />
          {!close &&   locations && locations.map((item, index) => {
              return (
                  <Text onPress={() => {
                      onSelected(item)
                  }} style={sTextItem} key={index}>{item.name}</Text>
              )
          })}
          <MapView
              style={mapViewWithLabelStyle.mapViewStyle}
              initialRegion={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
              }}
              region={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
              }}
              onPress={onPressMap}
          >
              <Marker
                  coordinate={region}
                  onDrag={onDragMarker}
              />
              <Circle center={region} radius={1000}/>
          </MapView>
      </React.Fragment>
    )
}
