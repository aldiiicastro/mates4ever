package mate4ever.ttip.repositoryTests

import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import mate4ever.ttip.repository.UserRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserRepositoryTest {
    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var petRepository: PetRepository

    private val userFactory: UserFactory = UserFactory()
    private val petFactory: PetFactory = PetFactory()
    private lateinit var pet: Pet

    @BeforeEach
    fun setUp() {
        pet = petRepository.insert(petFactory.anyPet())
    }

    @Test
    fun createAndFindPet() {
        var user = userFactory.anyUser(pets = listOf(pet))
        user = userRepository.insert(user)
        val findPet = userRepository.findItemById(user.id!!)
        assert(findPet!!.name == user.name)
    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var user = userFactory.anyUser(phone = null, image = null, pets = listOf(pet))
        user = userRepository.insert(user)
        val findPet = userRepository.findItemById(user.id!!)
        assert(findPet!!.name == user.name)
    }

    @Test
    fun getByWrongID() {
        val user = userRepository.findItemById("40")
        assert(user == null)
    }

    @Test
    fun getAllPetsIsEmpty() {
        val findPets = userRepository.findAll() as List<*>
        assert(findPets.isEmpty())
    }

    @Test
    fun getAllPetsCorrect() {
        val user = userFactory.anyUser(pets = listOf(pet))
        userRepository.insert(user)
        val findPets = userRepository.findAll() as List<*>
        assert(findPets.size == 1)
    }

    @AfterEach
    fun tearDown() {
        petRepository.deleteAll()
        userRepository.deleteAll()
    }
}
