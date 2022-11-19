package mate4ever.ttip.dto

class CommentRequestDTO (
    var id: String? = null,
    var petID: String,
    var image: MutableList<String>?,
    var dateOfSeen: String?,
    var commentary: String,
    var contact: String,
    var coordinates: Map<String, Double>?,
)
