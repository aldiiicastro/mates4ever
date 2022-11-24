package mate4ever.ttip.dto

import org.springframework.validation.annotation.Validated
import javax.validation.constraints.NotEmpty

@Validated
class CommentRequestDTO (
    var id: String? = null,
    @NotEmpty(message = "Debe haber una mascota")
    var petID: String,
    var image: MutableList<String>?,
    var dateOfSeen: String?,
    @NotEmpty(message = "Debes escribir un comentario")
    var commentary: String,
    @NotEmpty
    var contact: String,
    var coordinates: Map<String, Double>?,
)
