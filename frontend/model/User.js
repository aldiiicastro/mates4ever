import Pet from "./Pet"

export default class User{
    email
    image
    lastname
    municipality
    name
    pets
    phone
    province

    constructor(user) {
        this.email = user.email
        this.image = user.image
        this.lastname = user.lastname
        this.municipality = user.municipality
        this.name = user.name
        this.pets = this.createPets(user.pets)
        this.phone = user.phone
        this.province = user.province
    }

    createPets(pets){
        return pets.map((pet) => (new Pet(pet)))
    }
}