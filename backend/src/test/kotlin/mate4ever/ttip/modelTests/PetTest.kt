package mate4ever.ttip.modelTests

import mate4ever.ttip.dataHelpers.PetFactory
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@SpringBootTest
class PetTest {
    private val petFactory : PetFactory = PetFactory()
    @Test
    fun createUserTest() {
        var pet = petFactory.anyPet()
        assert(pet.name == "Gatito")
        assert(pet.image == "Example")
        assert(pet.age == 4)
        assert(pet.date == LocalDate.parse("14-09-2022", DateTimeFormatter.ofPattern("dd-MM-yyyy")))
        assert(pet.type == "Gato")
        assert(pet.breed == "Siames")
        assert(pet.state == "Perdido")
        assert(pet.tutor == "Aldi")
        assert(pet.description == "Se perdio en Bernal")
    }
}