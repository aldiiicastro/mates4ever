import {View} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import MapView, {Circle, Marker} from "react-native-maps";

export default function MapViewWithLabel({region, onSelected, onChangeText, locations, location, removeItem, onPressMap, onDragMarker}) {
    return(
        <View>
            <SearchableDropdown
                multi={true}
                selectedItems={[location]}
                onTextChange={(text) => onChangeText(text)}
                onItemSelect={(item) => onSelected(item)}
                onRemoveItem={removeItem}
                containerStyle={{padding: 5}}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 140}}
                items={locations}
                resetValue={true}
                textInputProps={
                    {
                        placeholder: "Direccion",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        }
                    }
                }

            />
            <MapView
                style={{width: "100%", height: 200}}
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
        </View>
    )
}
