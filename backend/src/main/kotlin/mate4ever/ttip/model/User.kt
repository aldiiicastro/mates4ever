package mate4ever.ttip.model

import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.annotation.Id
import javax.persistence.Column
import javax.persistence.Table
import javax.persistence.UniqueConstraint

@Document("user")
@Table(
    name = "users",
    uniqueConstraints = [UniqueConstraint(columnNames = arrayOf("email"))]
)

class User(
    @Id var id: String?,
    var name: String,
    var lastname: String,
    @Column(nullable = false, unique = true) var email: String,
    var password: String,
    var phone: Number?,
    val coordinates: Map<String, Double>?,
    var image: String?,
    var expoPushToken: String?,
)
