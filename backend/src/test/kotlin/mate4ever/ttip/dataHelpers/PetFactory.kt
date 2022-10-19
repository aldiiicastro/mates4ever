package mate4ever.ttip.dataHelpers

import mate4ever.ttip.dto.PetRequestDto
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
        description: String? = "Se perdio en Bernal"
    ): PetRequestDto {

        return PetRequestDto(
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
            description
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
        description: String? = "Se perdio en Bernal"
    ): Pet {

        return Pet(name, image, birth, type, breed, state, tutor, vaccine, castrated, medicalHistory, description)
    }

}
