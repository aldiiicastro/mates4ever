import axios from 'axios'
import bcrypt from "react-native-bcrypt";
import isaac from "isaac"
// const baseUrl = 'http://192.168.0.66:8070'
const baseUrl = 'http://192.168.0.10:8070'

const axinst = axios.create({
    baseURL: baseUrl,
    timeout: 15000
})

export const fetchSearch = async (query) => {
    const url = `${baseUrl}/api/pet/search?query=${query}`
    return await axios.get(url)
}

export const loginUser = async (userData) => {
    const url = `${baseUrl}/api/user/userData`;
  return await axios.post(url, {email: userData.email, password: userData.password})
}

export const getUserByEmail = async (email) => {
    const url = `${baseUrl}/api/user/email/${email}`;
  return await axios.get(url)
}

export const getPetById  = async (id) => {
    const url = `${baseUrl}/api/pet/${id}`
    return await axios.get(url)
}

export const createPet = async (pet) => {
    return await axinst.post(
        '/api/pet/create',
        pet)
}

export const createUser = async (user) => {
    bcrypt.setRandomFallback((len) => {
        const buf = new Uint8Array(len);
        return buf.map(() => Math.floor(isaac.random() * 256));
    })
    user.password= bcrypt.hashSync(user.password, 10)
    const url = `${baseUrl}/api/user/create`
    return await axios.post(url, user)
}

export const getProvince = async() => {
    return await axios.get("https://apis.datos.gob.ar/georef/api/provincias")
}

export const getMunicipalities = async(municipality) => {
    return await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${municipality}&max=100`)
}

