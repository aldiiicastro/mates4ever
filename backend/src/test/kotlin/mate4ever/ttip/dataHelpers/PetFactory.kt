package mate4ever.ttip.dataHelpers

import mate4ever.ttip.model.Pet

class PetFactory() {
    fun anyPet(
        name: String = "Gatito",
        image: String = "Example",
        age: Int = 4,
        date: String? = null,
        type: String = "Gato",
        breed: String? = "Siames",
        state: String = "Perdido",
        tutor:String = "Aldi",
        description: String? = "Se perdio en Bernal"): Pet {

        return Pet(name, image, age, date, type, breed, state, tutor, description)
    }
}
