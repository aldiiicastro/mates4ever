package mate4ever.ttip.dto

import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.model.Pet

data class UserDTO(val email: String, val password: String, val expoPushToken :String?)
data class UserResponseDTO(
    val name: String,
    val lastname: String,
    val email: String,
    val phone: Number?,
    val coordinates: Map<String, Double>?,
    val image: String?,
    val pets: Iterable<Pet>?
)
