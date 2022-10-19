package mate4ever.ttip.controllerTets

import mate4ever.ttip.controller.PetController
import mate4ever.ttip.controller.UserController
import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.exceptions.UserNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User
import mate4ever.ttip.model.UserDTO
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opentest4j.AssertionFailedError
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
    fun createAndFindUser() {
        var user = userFactory.anyUser(pets = listOf(pet))
        var userDTO = userController.createUser(user).body as UserDTO
        val userFound = userController.getUserBy(user.id!!).body as User
        assert(userFound.email == userDTO.email)

    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var user = userFactory.anyUser(phone = null, image =null, pets =listOf(pet))
        var userDTO = userController.createUser(user).body as UserDTO
        val userFound = userController.getUserBy(user.id!!).body as User
        assert(userFound.email == userDTO.email)
    }

    @Test
    fun getByWrongID() {
        assertThrows<UserNotFoundException>("No existe ningun usuario con ese id en la base de datos"){ userController.getUserBy("29")}
    }
    @Test
    fun getUserLogin() {
        var user = userFactory.anyUser(pets =listOf(pet))
        var userDTO = userController.createUser(user).body as UserDTO
        val userFound = userController.getUser("aldana@gmail.com").body as UserDTO
        assert(userFound.email == userDTO.email)
    }
    @Test
    fun getUserLoginWrongEmail() {
        var user = userFactory.anyUser(pets =listOf(pet))
        userController.createUser(user)
        assertThrows<UserNotFoundException>("No existe ningun usuario con ese email en la base de datos"){ userController.getUser("aldanaaa@gmail.com")}
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
