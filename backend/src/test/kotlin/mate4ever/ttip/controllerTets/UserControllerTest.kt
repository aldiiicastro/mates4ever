package mate4ever.ttip.controllerTets

import mate4ever.ttip.controller.PetController
import mate4ever.ttip.controller.UserController
import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus

@SpringBootTest
class UserControllerTest {
    @Autowired
    private lateinit var userController: UserController
    @Autowired
    private lateinit var petController: PetController
    private val userFactory : UserFactory = UserFactory()
    private val petFactory : PetFactory = PetFactory()
    private lateinit var pet : Pet

    @BeforeEach
    fun setUp(){
        pet = petController.createPet(petFactory.anyPetDTO()).body as Pet
    }

    @Test
    fun createAndFindPet() {
        var user = userFactory.anyUser(pets = listOf(pet))
        user = userController.createUser(user).body as User
        val findPet = userController.getUserBy(user.id!!).body as User
        assert(findPet.name == user.name)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var user = userFactory.anyUser(phone = null, image =null, pets =listOf(pet))
        user = userController.createUser(user).body as User
        val findPet = userController.getUserBy(user.id!!).body as User
        assert(findPet.name == user.name)
    }

    @Test
    fun getByWrongID() {
        val user = userController.getUserBy("29").statusCode
        assert(user == HttpStatus.NOT_FOUND)
    }
    @Test
    fun getUserLogin() {
        var user = userFactory.anyUser(pets =listOf(pet))
        user = userController.createUser(user).body as User
        val findUser = userController.getUser("aldana@gmail.com").body as User
        assert(findUser.name == user.name)
    }
    @Test
    fun getUserLoginWrongPassword() {
        var user = userFactory.anyUser(pets =listOf(pet))
        userController.createUser(user)
        var status = userController.getUser("aldana@gmail.com").statusCode
        assert(status == HttpStatus.NOT_FOUND)
    }
    @Test
    fun getUserLoginWrongEmail() {
        var user = userFactory.anyUser(pets =listOf(pet))
        userController.createUser(user)
        var status = userController.getUser("aldanadd@gmail.com").statusCode
        assert(status == HttpStatus.NOT_FOUND)
    }
    @Test
    fun getAllPetsIsEmpty() {
        val findPets = userController.getAllUsers() as List<*>
        assert(findPets.isEmpty())
    }

    @Test
    fun getAllPetsCorrect() {
        val user = userFactory.anyUser(pets =listOf(pet))
        userController.createUser(user)
        val findPets = userController.getAllUsers() as List<*>
        assert(findPets.size == 1)
    }

    @AfterEach
    fun tearDown() {
        petController.deleteAll()
        userController.deleteAll()
    }
}
