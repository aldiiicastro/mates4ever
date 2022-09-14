package mate4ever.ttip.repositoryTests

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class PetRepositoryTest {
    @Autowired
    private lateinit var petRepository: PetRepository

    @Test
    fun createAndFindPet() {
        var pet = Pet("Firu", "image", 5, null,"Dog", "none", "Lost", "Anto", "Lo encontre en la puerta de mi casa")
        pet = petRepository.insert(pet)
        val findPet = petRepository.findItemById(pet.id!!)
        assert(findPet!!.name == pet.name)
    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var pet = Pet("Firu", "image", 5, null,"Dog", null, "Lost", "Anto", null)
        pet = petRepository.insert(pet)
        val findPet = petRepository.findItemById(pet.id!!)
        assert(findPet!!.name == pet.name)
    }

    @Test
    fun getByWrongID() {
        val pet = petRepository.findItemById("29")
        println(pet == null)
    }

    @Test
    fun getAllPetsCorrect() {
        val findPets = petRepository.findAll()
        assert(findPets.size == 26)
    }

}