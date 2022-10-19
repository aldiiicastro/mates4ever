package mate4ever.ttip.serviceTests

import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.exceptions.UserIncorrectArgumentsException
import mate4ever.ttip.exceptions.UserNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.UserDTO
import mate4ever.ttip.service.PetService
import mate4ever.ttip.service.UserService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.junit.jupiter.api.assertThrows

@SpringBootTest
class UserServiceTest {
    @Autowired
    private lateinit var userService: UserService
    @Autowired
    private lateinit var petService: PetService

    private val userFactory : UserFactory = UserFactory()
    private val petFactory : PetFactory = PetFactory()
    private lateinit var pet : Pet

    @BeforeEach
    fun setUp(){
        pet = petService.createPet(petFactory.anyPetDTO())
    }

    @Test
    fun createAndFindPet() {
        var user = userFactory.anyUser(pets =listOf(pet))
        user = userService.createUser(user)
        val findUser = userService.findUserBy(user.id!!)
        assert(findUser.name == user.name)
    }

    @Test
    fun createAndFindPetWithNullParameters() {
        var user = userFactory.anyUser(phone = null, image =null, pets =listOf(pet))
        user = userService.createUser(user)
        val findUser = userService.findUserBy(user.id!!)
        assert(findUser.name == user.name)
    }
    @Test
    fun getByWrongID() {
        assertThrows<UserNotFoundException>("No existe ningun usuario con ese id en la base de datos"){userService.findUserBy("29")}
    }
    @Test
    fun findUserLogin() {
        var user = userFactory.anyUser(pets =listOf(pet))
        user = userService.createUser(user)
        val findUser = userService.findUser(UserDTO("aldana@gmail.com", "contrasena..."))
        assert(findUser!!.name == user.name)
    }
    @Test
    fun findUserLoginWrongPassword() {
        var user = userFactory.anyUser(pets =listOf(pet))
        userService.createUser(user)
        assertThrows<UserIncorrectArgumentsException>("No existe ningun usuario con ese id en la base de datos"){userService.findUser(UserDTO("aldana@gmail.com", "contrasena45..."))}
    }
    @Test
    fun findUserLoginWrongEmail() {
        var user = userFactory.anyUser(pets =listOf(pet))
        userService.createUser(user)
        assertThrows<UserIncorrectArgumentsException>("No existe ningun usuario con ese id en la base de datos"){userService.findUser(UserDTO("aldanadd@gmail.com", "contrasena..."))}
    }
    @Test
    fun getAllPetsIsEmpty() {
        val findUsers = userService.findAllUsers() as List<*>
        assert(findUsers.isEmpty())
    }
    @Test
    fun getAllPetsCorrect() {
        val user = userFactory.anyUser(pets =listOf(pet))
        userService.createUser(user)
        val findUsers = userService.findAllUsers() as List<*>
        assert(findUsers.size == 1)
    }
    @AfterEach
    fun tearDown() {
        petService.deleteAll()
        userService.deleteAll()
    }
}
