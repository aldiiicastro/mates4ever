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
        val pet = Pet("Firu", "image", 5, "Dog", "none", "Lost", "Anto", "Lo encontre en la puerta de mi casa")
        val newId = petController!!.createPet(pet).id
        val findPet = petController.getPet(newId!!)
        assert(findPet!!.name == pet.name)

    }
}