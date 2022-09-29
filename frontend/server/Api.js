import axios from 'axios';

const baseUrl = 'http://192.168.0.6:8090';

export const fetchSearch = async (query) => {
    const url = `${baseUrl}/api/pet/search?query=${query}`;
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

