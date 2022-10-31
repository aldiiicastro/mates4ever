package mate4ever.ttip.modelTests

import mate4ever.ttip.dataHelpers.PetFactory
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import java.time.LocalDate
import java.time.Month
import java.time.format.DateTimeFormatter

@SpringBootTest
class PetTest {
    private val petFactory: PetFactory = PetFactory()

    @Test
    fun createPetTest() {
        val pet = petFactory.anyPet(birth = LocalDate.of(2022, Month.SEPTEMBER, 14))
        assert(pet.name == "Gatito")
        assert(pet.image == "Example")
        assert(pet.birth == LocalDate.parse("14-09-2022", DateTimeFormatter.ofPattern("dd-MM-yyyy")))
        assert(pet.type == "Gato")
        assert(pet.breed == "Siames")
        assert(pet.state == "Perdido")
        assert(pet.user == "aldana@gmail.com")
        assert(pet.description == "Se perdio en Bernal")
    }
}
