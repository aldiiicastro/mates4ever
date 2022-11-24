package mate4ever.ttip.controllerTets

import com.fasterxml.jackson.databind.ObjectMapper
import mate4ever.ttip.controller.PetController
import mate4ever.ttip.controller.UserController
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.dto.UserDTO
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private lateinit var userController: UserController

    @Autowired
    private lateinit var petController: PetController

    @Autowired
    private lateinit var mockMvc: MockMvc

    private val userFactory: UserFactory = UserFactory()

    @Test
    fun createUser() {
        val user = userFactory.anyUser()
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().writeValueAsString(user))
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("email").value("aldana@gmail.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("password").value("++LMRceetmbxu2vkx9ZZI71pPgE7G2esPuBckIY="))
            .andExpect(MockMvcResultMatchers.jsonPath("expoPushToken").value(""))
    }

    @Test
    fun createAndFindUser() {
        val user = userFactory.anyUser()
        val coordinates = mapOf("latitude" to -36.6769415180527, "longitude" to -60.5588319815719)
        userController.createUser(user)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/${user.id}")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("name").value("Aldana"))
            .andExpect(MockMvcResultMatchers.jsonPath("lastname").value("Castro"))
            .andExpect(MockMvcResultMatchers.jsonPath("email").value("aldana@gmail.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("password").value("++LMRceetmbxu2vkx9ZZI71pPgE7G2esPuBckIY="))
            .andExpect(MockMvcResultMatchers.jsonPath("phone").value(1139538873))
            .andExpect(MockMvcResultMatchers.jsonPath("image").value("Example"))
            .andExpect(MockMvcResultMatchers.jsonPath("coordinates").value(coordinates))
            .andExpect(MockMvcResultMatchers.jsonPath("expoPushToken").value(""))
    }

    @Test
    fun createAndFindUserWithNullParameters() {
        val user = userFactory.anyUser(phone = null, image = null)
        val coordinates = mapOf("latitude" to -36.6769415180527, "longitude" to -60.5588319815719)
        userController.createUser(user)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/${user.id}")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("name").value("Aldana"))
            .andExpect(MockMvcResultMatchers.jsonPath("lastname").value("Castro"))
            .andExpect(MockMvcResultMatchers.jsonPath("email").value("aldana@gmail.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("password").value("++LMRceetmbxu2vkx9ZZI71pPgE7G2esPuBckIY="))
            .andExpect(MockMvcResultMatchers.jsonPath("phone").value(null))
            .andExpect(MockMvcResultMatchers.jsonPath("image").value(null))
            .andExpect(MockMvcResultMatchers.jsonPath("coordinates").value(coordinates))
            .andExpect(MockMvcResultMatchers.jsonPath("expoPushToken").value(""))
    }

    @Test
    fun getByWrongID() {
        val errorMessage = mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/${29}")
        )
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andReturn()
            .resolvedException?.message
        assertEquals(errorMessage, "No existe ningun usuario con ese id en la base de datos")
    }

    @Test
    fun getUserLogin() {
        val user = userFactory.anyUser()
        userController.createUser(user)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/email/${user.email}")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("email").value("aldana@gmail.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("password").value("++LMRceetmbxu2vkx9ZZI71pPgE7G2esPuBckIY="))
            .andExpect(MockMvcResultMatchers.jsonPath("expoPushToken").value(""))
    }

    @Test
    fun getUserLoginWrongPassword() {
        val user = userFactory.anyUser()
        userController.createUser(user)
        val userDTO = UserDTO("aldana@gmail.com", "contrasena.", "")
        val errorMessage = mockMvc.perform(
            MockMvcRequestBuilders.post("/api/user/userData")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().writeValueAsString(userDTO))
        )
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andReturn()
            .resolvedException?.message
        assertEquals(errorMessage, "El mail o la contraseña son incorrectos")
    }

    @Test
    fun getUserLoginWrongEmail() {
        val user = userFactory.anyUser()
        userController.createUser(user)
        val errorMessage = mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/email/aldanaaa@gmail.com")
        )
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andReturn()
            .resolvedException?.message
        assertEquals(errorMessage, "El mail o la contraseña son incorrectos")
    }

    @Test
    fun getAllPetsCorrect() {
        val user = userFactory.anyUser()
        userController.createUser(user)
        val findPets = userController.getAllUsers() as List<*>
        assert(findPets.size == 1)
    }
    @Test
    fun getSearchBy() {
        val user = userFactory.anyUser()
        userController.createUser(user)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/${user.email}/pets")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(0))
    }

    @Test
    fun getCompleteUser() {
        val user = userFactory.anyUser()
        val coordinates = mapOf("latitude" to -36.6769415180527, "longitude" to -60.5588319815719)
        userController.createUser(user)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/user/allData/${user.email}")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("name").value("Aldana"))
            .andExpect(MockMvcResultMatchers.jsonPath("lastname").value("Castro"))
            .andExpect(MockMvcResultMatchers.jsonPath("email").value("aldana@gmail.com"))
            .andExpect(MockMvcResultMatchers.jsonPath("phone").value(1139538873))
            .andExpect(MockMvcResultMatchers.jsonPath("coordinates").value(coordinates))
            .andExpect(MockMvcResultMatchers.jsonPath("image").value("Example"))
    }

    @AfterEach
    fun tearDown() {
        petController.deleteAll()
        userController.deleteAll()
    }
}
