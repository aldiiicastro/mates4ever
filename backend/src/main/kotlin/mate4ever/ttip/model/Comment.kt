package mate4ever.ttip.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import javax.validation.constraints.NotEmpty
@Document("comment")
open class Comment(

    @Id
    var id: String? = null,
    @NotEmpty(message = "Debe haber una mascota")
    var petID: String,
    var image: MutableList<String>?,
    var dateOfSeen: LocalDate?,
    @NotEmpty(message = "Debes escribir un comentario")
    var commentary: String,
    @NotEmpty
    var contact: String,
    var coordinates: Map<String, Double>?,
)
