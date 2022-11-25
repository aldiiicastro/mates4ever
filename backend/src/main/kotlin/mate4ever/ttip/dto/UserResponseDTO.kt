package mate4ever.ttip.dto


data class UserResponseDTO(
    val name: String,
    val lastname: String,
    val email: String,
    val phone: Number?,
    val coordinates: Map<String, Double>?,
    val image: String?
)

