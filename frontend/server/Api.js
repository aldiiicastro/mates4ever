import axios from 'axios';
import Pet from "../model/Pet";

const baseUrl = 'http://192.168.0.66:8090';

// Invoking get method to perform a GET request
export const fetchPets = async () => {
    const url = `${baseUrl}/api/transfer/all`;
    return await axios.get(url)
}

export const fetchSearch = async (query) => {
    const url = `${baseUrl}/api/transfer/search?query=${query}`;
    const response = await axios.get(url);
    const pets = []
    response.data.forEach((pet) => pets.push((new Pet(pet.id,pet.name, pet.image, pet.age, pet.date, pet.type, pet.breed, pet.state, pet.tutor, pet.description))))
    return pets
}

export const getPetById  = async (id) => {
    const url = `${baseUrl}/api/transfer/${id}`;
    return await axios.get(url)
}


