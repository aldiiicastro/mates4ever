package mate4ever.ttip.PetTest

import mate4ever.ttip.controller.PetController
import mate4ever.ttip.model.Pet
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class PetTest {
    @Autowired
    private val petController:PetController ? = null

    @Test
    fun createAndFindPet() {
        var pet = Pet("Firu", "image", 5, null,"Dog", "none", "Lost", "Anto", "Lo encontre en la puerta de mi casa")
        pet = petController!!.createPet(pet).body as Pet
        val findPet = petController.getPet(pet.id!!).body as Pet
        assert(findPet.name == pet.name)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var pet = Pet("Firu", "image", 5, null,"Dog", null, "Lost", "Anto", null)
        pet = petController!!.createPet(pet).body as Pet
        val findPet = petController.getPet(pet.id!!).body as Pet
        assert(findPet.name == pet.name)

    }
}