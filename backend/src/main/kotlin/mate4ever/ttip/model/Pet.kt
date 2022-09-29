package mate4ever.ttip.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate
import java.time.format.DateTimeFormatter


@Document("pet")
class Pet(
    var name: String,
    var image: String,
    var birth: LocalDate?,
    var type: String,
    var breed: String?,
    var state: String,
    var tutor: String,
    var vaccine: Boolean,
    var castrated: Boolean,
    var medicalHistory: String?,
    var description: String?
) {
    @Id
    var id: String? = null
}