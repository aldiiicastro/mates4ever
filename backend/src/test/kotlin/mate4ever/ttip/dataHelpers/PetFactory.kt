package mate4ever.ttip.dataHelpers

import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User
import java.time.LocalDate

class PetFactory() {
    fun anyPetDTO(
        name: String = "Gatito",
        image: String = "Example",
        birth: String? = null,
        type: String = "Gato",
        breed: String? = "Siames",
        state: String = "Perdido",
        tutor: String = "aldana@gmail.com",
        vaccine: Boolean = true,
        castrated: Boolean = true,
        medicalHistory: String? = null,
        description: String? = "Se perdio en Bernal",
        coordinates: Map<String, Double>? = mapOf("latitude" to -36.6769415180527, "longitude" to 	-60.5588319815719)
    ): PetRequestDTO {

        return PetRequestDTO(
            name,
            image,
            birth,
            type,
            breed,
            state,
            tutor,
            vaccine,
            castrated,
            medicalHistory,
            description,
            coordinates
        )
    }

    fun anyPet(
        name: String = "Gatito",
        image: String = "Example",
        birth: LocalDate? = null,
        type: String = "Gato",
        breed: String? = "Siames",
        state: String = "Perdido",
        tutor: User = UserFactory().anyUser(pets = listOf()),
        vaccine: Boolean = true,
        castrated: Boolean = true,
        medicalHistory: String? = null,
        description: String? = "Se perdio en Bernal",
        coordinates: Map<String, Double>? = null

    ): Pet {

        return Pet(name, image, birth, type, breed, state, tutor.email, vaccine, castrated, medicalHistory, description, coordinates)
    }

}
