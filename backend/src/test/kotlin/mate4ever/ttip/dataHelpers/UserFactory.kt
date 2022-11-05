package mate4ever.ttip.dataHelpers

import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User

class UserFactory {
    fun anyUser(
        id: String? = null,
        name: String = "Aldana",
        lastname: String = "Castro",
        email: String = "aldana@gmail.com",
        password: String = "contrasena...",
        phone: Int? = 1139538873,
        street: String = "Victoria",
        numberStreet : Int = 89,
        province: String = "Buenos Aires",
        municipality: String = "Quilmes",
        image: String? = "Example",
        pets: List<Pet> = listOf()
    ): User {
        return User(id, name, lastname, email, password, phone,street, numberStreet, municipality, province,image, "")
    }
}
