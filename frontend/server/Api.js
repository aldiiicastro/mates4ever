import axios from 'axios'
const baseUrl = 'http://192.168.0.66:8070'

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
        `${baseUrl}/api/pet/create`,
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

export const getNearByPets = async() => {
    const url = `${baseUrl}/api/pet/getNearbyPets`
    return await axinst.get(url)
}
//******************** Create comment ********************
export  const createComment = async(comment) => {
    return await axinst.post(
        `${baseUrl}/api/comment/create`,
        comment)
}

export const getComments = async(petID) => {
    const url = `${baseUrl}/api/comment/${petID}`
    return await axinst.get(url)
}

//******************** Location ********************

export const getDir = async(dir) => {
    return axinst.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${dir}`)
}
