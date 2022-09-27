import axios from 'axios';
import Pet from "../model/Pet";

const baseUrl = 'http://192.168.100.23:8090';

export const fetchSearch = async (query) => {
    const url = `${baseUrl}/api/pet/search?query=${query}`;
    // throw new Error("hubo un error")
    const response = await fetch(url);
    const result = await response.json()
    return result
}

export const getPetById  = async (id) => {
    const url = `${baseUrl}/api/pet/${id}`;
    return await axios.get(url)
}


