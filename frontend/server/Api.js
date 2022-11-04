import axios from 'axios'
const baseUrl = 'http://10.12.15.236:8070'

const axinst = axios.create({
    baseURL: baseUrl,
    timeout: 15000
})

//******************** User ********************
export const createUser = async (user) => {
    const url = `${baseUrl}/api/user/create`
    return await axinst.post(url, user)
}

export const loginUser = async (userData) => {
    const url = `${baseUrl}/api/user/userData`;
  return await axinst.post(url, {email: userData.email, password: userData.password})
}
export const getAllUser = async () => {
    const url = `${baseUrl}/api/user/all`;
    return await axios.get(url)
}


export const getUserByEmail = async (email) => {
    const url = `${baseUrl}/api/user/email/${email}`;
  return await axinst.get(url)
}

export const getUserDataByEmail = async (email) => {
    const url = `${baseUrl}/api/user/allData/${email}`;
    return await axinst.get(url)
}

//******************** Pet ********************
export const createPet = async (pet) => {
    return await axinst.post(
        '/api/pet/create',
        pet)
}

export const getSearchedPets = async (query) => {
    const url = `${baseUrl}/api/pet/search?query=${query}`
    return await axinst.get(url)
}

export const getPetById  = async (id) => {
    const url = `${baseUrl}/api/pet/${id}`
    return await axinst.get(url)
}

export const getPetByUser  = async (user) => {
    const url = `${baseUrl}/api/pets/${user}`
    return await axinst.get(url)
}

//******************** Location ********************
export const getProvince = async() => {
    return await axinst.get("https://apis.datos.gob.ar/georef/api/provincias")
}

export const getMunicipalities = async(municipality) => {
    return await axinst.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${municipality}&max=100`)
}

