package mate4ever.ttip.controllerTets

import mate4ever.ttip.controller.PetController
import mate4ever.ttip.model.Pet
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus

@SpringBootTest
class PetControllerTest {
    @Autowired
    private lateinit var petController:PetController

    @Test
    fun createAndFindPet() {
        var pet = Pet("Firu", "image", 5, null,"Dog", "none", "Lost", "Anto", "Lo encontre en la puerta de mi casa")
        pet = petController.createPet(pet).body as Pet
        val findPet = petController.getPet(pet.id!!).body as Pet
        assert(findPet.name == pet.name)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var pet = Pet("Firu", "image", 5, null,"Dog", null, "Lost", "Anto", null)
        pet = petController.createPet(pet).body as Pet
        val findPet = petController.getPet(pet.id!!).body as Pet
        assert(findPet.name == pet.name)
    }

    @Test
    fun getByWrongID() {
        val pet = petController.getPet("29").statusCode
        assert(pet == HttpStatus.NOT_FOUND)
    }

    @Test
    fun getAllPetsCorrect() {
        val findPets = petController.getAllPets() as List<*>
        assert(findPets.size == 26)
    }

    @Test
    fun searchCats() {
        val findPets = petController.searchBy("Gato").body as List<*>
        assert(findPets.size == 9)
    }

    @Test
    fun searchBadWord() {
        val findPets = petController.searchBy("Gatoss").body as List<*>
        assert(findPets.isEmpty())
    }
}