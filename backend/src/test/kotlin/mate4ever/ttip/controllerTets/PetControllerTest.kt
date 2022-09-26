package mate4ever.ttip.controllerTets

import mate4ever.ttip.controller.PetController
import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.model.Pet
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus

@SpringBootTest
class PetControllerTest {
    @Autowired
    private lateinit var petController:PetController
    private var petFactory : PetFactory = PetFactory()
    @Test
    fun createAndFindPet() {
        var pet = petFactory.anyPet()
        pet = petController.createPet(pet).body as Pet
        val findPet = petController.getPet(pet.id!!).body as Pet
        assert(findPet.name == pet.name)

    }
    @Test
    fun createAndFindPetWithNullParameters() {
        var pet = petFactory.anyPet("Firu", "image", 5, null,"Dog", null, "Lost", "Anto", null)
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
        val pet = petFactory.anyPet()
        petController.createPet(pet).body as Pet
        val findPets = petController.getAllPets() as List<*>
        assert(findPets.size == 1)
    }
    @Test
    fun searchCats() {
        val pet = petFactory.anyPet()
        petController.createPet(pet).body as Pet
        val findPets = petController.searchBy("Gato").body as List<*>
        assert(findPets.size == 1)
    }
    @Test
    fun searchBadWord() {
        val findPets = petController.searchBy("Gatoss").body as List<*>
        assert(findPets.isEmpty())
    }
    @AfterEach
    fun tearDown(){
        petController.deleteAll()
    }
}
