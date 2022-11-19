package mate4ever.ttip.dto

class PetResponseDTO(
    val id: String,
    val name: String,
    val image: String,
    val birth: String?,
    val type: String,
    val breed: String?,
    val state: String,
    val tutor: String,
    val vaccine: Boolean,
    val castrated: Boolean,
    val medicalHistory: String?,
    val description: String?,
    val coordinates: Map<String, Double>?
) {}
