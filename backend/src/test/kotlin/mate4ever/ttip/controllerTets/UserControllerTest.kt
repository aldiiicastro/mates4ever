package mate4ever.ttip.controllerTets

import mate4ever.ttip.controller.PetController
import mate4ever.ttip.controller.UserController
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.exceptions.UserNotFoundException
import mate4ever.ttip.model.User
import mate4ever.ttip.dto.UserDTO
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserControllerTest {
    @Autowired
    private lateinit var userController: UserController

    @Autowired
    private lateinit var petController: PetController
    private val userFactory: UserFactory = UserFactory()

    @Test
    fun createAndFindUser() {
        val user = userFactory.anyUser(pets = listOf())
        val userDTO = userController.createUser(user).body as UserDTO
        val userFound = userController.getUserBy(user.id!!).body as User
        assert(userFound.email == userDTO.email)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        val user = userFactory.anyUser(phone = null, image = null, pets = listOf())
        val userDTO = userController.createUser(user).body as UserDTO
        val userFound = userController.getUserBy(user.id!!).body as User
        assert(userFound.email == userDTO.email)
    }

    @Test
    fun getByWrongID() {
        assertThrows<UserNotFoundException>("No existe ningun usuario con ese id en la base de datos") {
            userController.getUserBy(
                "29"
            )
        }
    }

    @Test
    fun getUserLogin() {
        val user = userFactory.anyUser(pets = listOf())
        val userDTO = userController.createUser(user).body as UserDTO
        val userFound = userController.getUser("aldana@gmail.com").body as UserDTO
        assert(userFound.email == userDTO.email)
    }

    @Test
    fun getUserLoginWrongEmail() {
        val user = userFactory.anyUser(pets = listOf())
        userController.createUser(user)
        assertThrows<UserNotFoundException>("No existe ningun usuario con ese email en la base de datos") {
            userController.getUser(
                "aldanaaa@gmail.com"
            )
        }
    }

    @Test
    fun getAllPetsIsEmpty() {
        val findPets = userController.getAllUsers() as List<*>
        assert(findPets.isEmpty())
    }

    @Test
    fun getAllPetsCorrect() {
        val user = userFactory.anyUser(pets = listOf())
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
