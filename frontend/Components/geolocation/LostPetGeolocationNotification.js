// import React, { useEffect, useState } from 'react';
// import { Text, TouchableOpacity } from 'react-native';
// import * as TaskManager from 'expo-task-manager';
// import * as Location from 'expo-location';

// export default function LostPetGeolocationNotification() {
//   const [location, setLocation] = useState({})
//     useEffect(() => {
//       requestPermissions()
//   }, []);

//   const requestPermissions = async () => {
//     const { status } = await Location.requestBackgroundPermissionsAsync();
//     if (status === 'granted') {
//       await Location.startLocationUpdatesAsync('background-location-task', {
//         accuracy: Location.Accuracy.Balanced,
//       });
//     };
//   }

//   TaskManager.defineTask('background-location-task', ({ data, error }) => {
//     if (error) {
//       return;
//     }
//     if (data) {
//       const { locations } = data;
//       console.log("localizacion: " , locations)
//     }
//   });
  
//   return (
//     <TouchableOpacity onPress={requestPermissions}>
//       <Text>Enable background location</Text>
//     </TouchableOpacity> 
//   )
// }
