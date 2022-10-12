import axios from 'axios'

const baseUrl = 'http://10.12.1.103:8090'

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
    const url = `${baseUrl}/api/pet/${id}`;
    return await axios.get(url)
}

export const createPet = async (pet) => {
    const url = `${baseUrl}/api/pet/create`;
    return await axios.post(url, pet)
}

export const createUser = async (user) => {
    const url = `${baseUrl}/api/user/create`;
    return await axios.post(url, user)
}

export const getProvince = async() => {
    return await axios.get("https://apis.datos.gob.ar/georef/api/provincias")
}
