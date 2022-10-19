package mate4ever.ttip.dto

import mate4ever.ttip.dto.PetRequestDTO

data class UserDTO(val email: String, val password: String)
data class UserResponseDTO(val name: String, val lastname: String,val email: String, val phone: Number?, val municipality: String, val province: String, val image: String?, val pets: List<PetRequestDTO> )
