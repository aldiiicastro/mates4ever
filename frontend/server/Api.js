import axios from 'axios'

const baseUrl = 'http://192.168.0.10:8070'

const axinst = axios.create({
    baseURL: baseUrl,
    timeout: 15000
})

//******************** User ********************
//Create user. Return only email, password and expoPush.
export const createUser = async (user) => {
    const url = `${baseUrl}/api/user/create`
    return await axinst.post(url, user)
}
//Search user by password and email. Return only email, password and expoPush.
export const loginUser = async (userData) => {
    const url = `${baseUrl}/api/user/userData`
    return await axinst.post(url, {email: userData.email, password: userData.password})
}
//Get all users. Return only email and expoPushToken.
export const getAllUser = async (lat, long) => {
    const url = `${baseUrl}/api/user/nearby?latitude=${lat}&longitude=${long}`
    return await axios.get(url)
}

//Get user by email. Return only email and expoPushToken.
export const getUserByEmail = async (email) => {
    const url = `${baseUrl}/api/user/email/${email}`;
    return await axinst.get(url)
}

export const getUserDataByEmail = async (email) => {
    const url = `${baseUrl}/api/user/allData/${email}`
    return await axinst.get(url)
}

//******************** Pet ********************
//    Create a pet
export const createPet = async (pet) => {

    return await axinst.post(
        `${baseUrl}/api/pet/create`,
        pet)
}
//Search pet by text, closeness, state and type
export const getSearchedPets = async (query, type, closeness, state) => {
    const url = `${baseUrl}/api/pet/search?search=${query}&type=${type}&state=${state}&closeness=${closeness}`
    console.log( url)
    return await axinst.get(url)
}
//Get pet by id
export const getPetById = async (id) => {
    const url = `${baseUrl}/api/pet/${id}`
    return await axinst.get(url)
}
//Delete pet by id
export const deletePetById = async (id) => {
    const url =`${baseUrl}/api/pet/delete/${id}`
    return await axinst.delete(url)
}

export const getNearByPets = async (lat, long) => {
    const url = `${baseUrl}/api/pet/nearby?latitude=${lat}&longitude=${long}`
    return await axinst.get(url)
}

export const getPetByUser = async (user) => {
    const url = `${baseUrl}/api/pet/all/${user}`
    return await axinst.get(url)
}
//******************** Create comment ********************
export const createComment = async (comment) => {
    return await axinst.post(
        `${baseUrl}/api/comment/create`,
        comment)
}

export const getComments = async (petID) => {
    const url = `${baseUrl}/api/comment/${petID}`
    return await axinst.get(url)
}

//******************** Location ********************

export const getDir = async (dir) => {
    return axinst.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${dir}`)
}


//******************** Notifications ***************
export const postNotifications = async (body) => {
    const headers = {
        headers:
            {
                'Accept':
                    'application/json',
                'Accept-encoding':
                    'gzip, deflate',
                'Content-Type':
                    'application/json',
            }
    }
    return await axios.post('https://exp.host/--/api/v2/push/send', {body: body});
}