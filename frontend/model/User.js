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

    constructor(user, municipality, province) {
        this.email = user.email
        this.image = user.image
        this.lastname = user.lastname
        this.municipality = municipality
        this.name = user.name
        this.phone = user.phone
        this.province = province
    }

}
