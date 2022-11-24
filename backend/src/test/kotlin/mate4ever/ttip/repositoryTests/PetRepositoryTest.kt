package mate4ever.ttip.repositoryTests

import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.repository.PetRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class PetRepositoryTest {
    @Autowired
    private lateinit var petRepository: PetRepository
    private var petFactory: PetFactory = PetFactory()

    @Test
    fun createAndFindPet() {
        var pet = petFactory.anyPet()
        pet = petRepository.insert(pet)
        val findPet = petRepository.findItemById(pet.id!!)
        assert(findPet!!.name == pet.name)
    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var pet = petFactory.anyPet(
            "Firu",
            "image",
            null,
            "Dog",
            null,
            "Lost",
            UserFactory().anyUser(),
            description = null
        )
        pet = petRepository.insert(pet)
        val findPet = petRepository.findItemById(pet.id!!)
        assert(findPet!!.name == pet.name)
    }

    @Test
    fun getByWrongID() {
        val pet = petRepository.findItemById("29")
        assert(pet == null)
    }

    @Test
    fun getAllPetsCorrect() {
        val pet = petFactory.anyPet()
        petRepository.insert(pet)
        val findPets = petRepository.findAll()
        assert(findPets.size == 1)
    }

    @AfterEach
    fun tearDown() {
        petRepository.deleteAll()
    }

}
