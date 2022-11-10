import {getApps, initializeApp} from "firebase/app"
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as ImagePicker from 'expo-image-picker'

const firebaseConfig = {
    apiKey: "AIzaSyAU3hYL4RddVNuaEhoM5I47RzfjV9bRepk",
    authDomain: "mates4ever-d17cb.firebaseapp.com",
    projectId: "mates4ever-d17cb",
    storageBucket: "mates4ever-d17cb.appspot.com",
    databaseURL: "mates4ever-d17cb.firebaseio.com",
    messagingSenderId: "644575077241",
    appId: "1:644575077241:web:01425d937a2f5f86d005a8",
    measurementId: "G-8290PEZFNJ"
}

const app = initializeApp(firebaseConfig)

export const pickImage = async () => {
    if (Platform.OS !== "web") {
        const {
            status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
            alert("Lo lamentamos, necesitamos acceder a la galeria para realizar esta función")
        }
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
    })

    return pickerResult
}

export const handleImagePicked = async (pickerResult) => {
    try {
        if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri)
            return uploadUrl
        }
    } catch (e) {
        alert("Fallo la subida, intente de nuevo mas tarde")
    }
}

export async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            resolve(xhr.response)
        }
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", uri, true)
        xhr.send(null)
    })

    const uid = uuidv4();
    const fileRef = ref(getStorage(), uid)

    const result = await uploadBytes(fileRef, blob)
    blob.close()

    return getDownloadURL(fileRef)
}


