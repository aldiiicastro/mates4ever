package mate4ever.ttip.serviceTests

import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.PetService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import java.lang.IllegalArgumentException

@SpringBootTest
class PetServiceTest {
    @Autowired
    private lateinit var petService: PetService


    @Test
    fun createAndFindPet() {
        var pet = Pet("Firu", "image", 5, null,"Dog", "none", "Lost", "Anto", "Lo encontre en la puerta de mi casa")
        pet = petService.createPet(pet)
        val findPet = petService.findById(pet.id!!)
        assert(findPet.name == pet.name)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var pet = Pet("Firu", "image", 5, null,"Dog", null, "Lost", "Anto", null)
        pet = petService.createPet(pet)
        val findPet = petService.findById(pet.id!!)
        assert(findPet.name == pet.name)
    }

    @Test
    fun getByWrongID() {
        assertThrows<IllegalArgumentException>("No existe ninguna mascota con ese id en la base de datos"){petService.findById("29")}
    }

    @Test
    fun getAllPetsCorrect() {
        val findPets = petService.findAll() as List<*>
        assert(findPets.size == 26)
    }

    @Test
    fun searchCats() {
        val findPets = petService.search("Gato")
        assert(findPets.size == 9)
    }

    @Test
    fun searchBadWord() {
        val findPets = petService.search("Gatoss")
        assert(findPets.isEmpty())
    }
}