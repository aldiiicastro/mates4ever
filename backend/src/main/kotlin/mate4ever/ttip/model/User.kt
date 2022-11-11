package mate4ever.ttip.model

import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.annotation.Id
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.FetchType
import javax.persistence.OneToMany
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
    val street: String,
    val streetNumber: Number,
    var municipality: String,
    var province: String,
    var image: String?,
    var expoPushToken: String?,
//    @OneToMany(mappedBy="user", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)

){
    var pets: MutableList<String> = mutableListOf()
    fun addPet(pet:String){
        pets.add(pet)
    }
}
