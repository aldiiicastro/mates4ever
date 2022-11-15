package mate4ever.ttip.dto

import mate4ever.ttip.model.Pet
import java.time.LocalDate

class PetDocumentDTO(
    id: String,
    name: String,
    image: String,
    birth: LocalDate?,
    type: String,
    breed: String?,
    state: String,
    tutor: String,
    vaccine: Boolean,
    castrated: Boolean,
    medicalHistory: String?,
    description: String?,
    coordinates: Map<String, Double>?
) : Pet(name,image,birth,type,breed,state,tutor,vaccine,castrated, medicalHistory, description, coordinates, id){}
