import MapView, {Circle, Marker} from "react-native-maps";

export default function SavedMapView({param}) {
    return (
        <MapView
            style={{marginHorizontal: 10, marginTop: 30, height: 200}}
            initialRegion={{
                latitude: param.coordinates.latitude,
                longitude: param.coordinates.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
            showsUserLocation={true}>
            <Marker coordinate={param.coordinates}/>
            <Circle center={param.coordinates} radius={1000}/>
        </MapView>
    )
}
