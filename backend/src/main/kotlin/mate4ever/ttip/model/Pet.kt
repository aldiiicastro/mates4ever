package mate4ever.ttip.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import javax.persistence.FetchType
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.validation.constraints.NotEmpty
@Document("pet")
class Pet(
    @NotEmpty(message = "El nombre es obligatorio")
    var name: String,
    @NotEmpty(message = "La imagen es obligatoria")
    var image: String,
    var birth: LocalDate?,
    @NotEmpty(message = "Debes elegir el tipo de animal que estas publicando")
    var type: String,
    var breed: String?,
    @NotEmpty(message = "Debes elegir en que estado se encuentra el animal")
    var state: String,
    @NotEmpty(message = "El tutor es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id", nullable = false)
    var tutor: User,
    var vaccine: Boolean,
    var castrated: Boolean,
    var medicalHistory: String?,
    var description: String?
) {
    @Id
    var id: String? = null
}
