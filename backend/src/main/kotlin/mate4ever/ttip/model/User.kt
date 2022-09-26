package mate4ever.ttip.model

import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.annotation.Id

@Document("user")
class User(@Id var id: String?, var name: String, var lastname: String, var email:String, var password: String, var phone: Number?, var location: String, var image: String?, var pets: List<Pet>)
