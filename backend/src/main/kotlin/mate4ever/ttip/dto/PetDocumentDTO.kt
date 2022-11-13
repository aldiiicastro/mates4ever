package mate4ever.ttip.dto

import mate4ever.ttip.model.Pet
import java.time.LocalDate

class PetDocumentDTO(
    val _class: String,
    id: String,
    image: String,
    birth: String,
    type: String,
    breed: String?,
    state: String,
    tutor: String,
    vaccine: Boolean,
    castrated: Boolean,
    medicalHistory: String?,
    description: String?,
    coordinates: Map<String, Double>?
) : Pet(id,image,LocalDate.parse(birth),type,breed,state,tutor,vaccine,castrated, medicalHistory, description, coordinates){}
