import axios from 'axios';
const baseUrl = 'http://192.168.0.39:8090';

// Invoking get method to perform a GET request
export const fetchPets = async () => {
    const url = `${baseUrl}/api/transfer/all`;
    const response = await axios.get(url);
    return response
}

export const fetchSearch = async (string) => {
    const url = `${baseUrl}/api/transfer/search?query=${string}`;
    const response = await axios.get(url);
    return response
}