import axios from 'axios';
import Pet from "../model/Pet";

const baseUrl = 'http://192.168.0.66:8090';

export const fetchSearch = async (query) => {
    const url = `${baseUrl}/api/pet/search?query=${query}`;
    const response = await axios.get(url);
    console.log(response)
    return response
}

export const getPetById  = async (id) => {
    const url = `${baseUrl}/api/pet/${id}`;
    return await axios.get(url)
}


