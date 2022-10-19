package mate4ever.ttip.serviceTests

import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.service.PetService
import mate4ever.ttip.service.UserService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class PetServiceTest {
    @Autowired
    private lateinit var petService: PetService

    @Autowired
    private lateinit var userService: UserService
    private var petFactory: PetFactory = PetFactory()
    private var userFactory: UserFactory = UserFactory()

    @BeforeEach
    fun setUp() {
        val user = userFactory.anyUser(pets = listOf())
        userService.createUser(user)
    }

    @Test
    fun createAndFindPet() {
        val petDTO = petFactory.anyPetDTO()
        val pet = petService.createPet(petDTO)
        val findPet = petService.findById(pet.id!!)
        assert(findPet.name == pet.name)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        val petDTO =
            petFactory.anyPetDTO("Firu", "image", null, "Dog", null, "Lost", "aldana@gmail.com", description = null)
        val pet = petService.createPet(petDTO)
        val findPet = petService.findById(pet.id!!)
        assert(findPet.name == pet.name)
    }

    @Test
    fun getByWrongID() {
        assertThrows<PetNotFoundException>("No existe ninguna mascota con ese id en la base de datos") {
            petService.findById(
                "29"
            )
        }
    }

    @Test
    fun getAllPetsCorrect() {
        val pet = petFactory.anyPetDTO()
        petService.createPet(pet)
        val findPets = petService.findAll() as List<*>
        assert(findPets.size == 1)
    }

    @Test
    fun searchCats() {
        val pet = petFactory.anyPetDTO()
        petService.createPet(pet)
        val findPets = petService.search("Gato")
        assert(findPets.size == 1)
    }

    @Test
    fun searchBadWord() {
        val findPets = petService.search("Gatoss")
        assert(findPets.isEmpty())
    }

    @AfterEach
    fun tearDown() {
        petService.deleteAll()
        userService.deleteAll()
    }
}
