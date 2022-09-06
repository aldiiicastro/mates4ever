import axios from 'axios';
const baseUrl = 'http://192.168.0.27:8080';

// Invoking get method to perform a GET request
export const fetchPets = async () => {
    const url = `${baseUrl}/api/transfer/all`;
    const response = await axios.get(url);
    return response
}