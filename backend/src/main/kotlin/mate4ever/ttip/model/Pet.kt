package mate4ever.ttip.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document("pet")
class Pet {
    @Id
    var id: String? = null
    var name:String? = null   // ( obligatorio )
    var image:String? = null   // ( obligatorio )
    var age:Int? = null   // ( por rangos ) ( obligatorio )
    var date:LocalDate? = null   // de Ingreso ( opcional )
    var type:String? = null   // ( obligatorio )
    var breed:String? = null   // ( opcional )
    var state:String? = null   // ( En adopcion, en transito o perdido ) ( obligatorio )
    var tutor:String? = null   // ( obligatorio )
    var description:String? = null   // ( opcional )

    constructor(
        name:String,
        image:String,
        age:Int,
//        date:LocalDate,
        type:String,
        breed:String,
        state:String,
        tutor:String,
        description:String
    ) : super() {
        this.name = name
        this.image = image
        this.age = age
//        this.date = date
        this.type = type
        this.breed = breed
        this.state = state
        this.tutor = tutor
        this.description = description
    }

}