package mate4ever.ttip.controllerTets

import com.fasterxml.jackson.databind.ObjectMapper
import mate4ever.ttip.controller.PetController
import mate4ever.ttip.controller.UserController
import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.PetService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*


@SpringBootTest
@AutoConfigureMockMvc
class PetControllerTest {
    @Autowired
    private lateinit var userController: UserController

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var petController: PetController
    @Autowired
    private lateinit var petService: PetService
    private var petFactory: PetFactory = PetFactory()
    private val userFactory: UserFactory = UserFactory()

    @BeforeEach
    fun setUp() {
        petController.deleteAll()
        userController.deleteAll()
        val user = userFactory.anyUser()
        userController.createUser(user)
    }
    @Test
    fun createPet() {
        val pet = petFactory.anyPetDTO()
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/pet/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().writeValueAsString(pet)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("name").value("Gatito"))
            .andExpect(jsonPath("image").value("Example"))
            .andExpect(jsonPath("birth").value(null))
            .andExpect(jsonPath("type").value("Gato"))
            .andExpect(jsonPath("breed").value("Siames"))
            .andExpect(jsonPath("state").value("Perdido"))
            .andExpect(jsonPath("user").value("aldana@gmail.com"))
            .andExpect(jsonPath("vaccine").value(true))
            .andExpect(jsonPath("castrated").value(true))
            .andExpect(jsonPath("medicalHistory").value(null))
            .andExpect(jsonPath("description").value("Se perdio en Bernal"))
            .andExpect(jsonPath("coordinates").value(pet.coordinates))

    }

    @Test
    fun createAndFindPet() {
        val pet = petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/${pet.id}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.length()").value(13))
            .andExpect(jsonPath("name").value("Gatito"))
            .andExpect(jsonPath("image").value("Example"))
            .andExpect(jsonPath("birth").value(null))
            .andExpect(jsonPath("type").value("Gato"))
            .andExpect(jsonPath("breed").value("Siames"))
            .andExpect(jsonPath("state").value("Perdido"))
            .andExpect(jsonPath("user").value("aldana@gmail.com"))
            .andExpect(jsonPath("vaccine").value(true))
            .andExpect(jsonPath("castrated").value(true))
            .andExpect(jsonPath("medicalHistory").value(null))
            .andExpect(jsonPath("description").value("Se perdio en Bernal"))
            .andExpect(jsonPath("coordinates").value(pet.coordinates))
            .andExpect(jsonPath("id").value(pet.id))
    }

    @Test
    fun createAndFindPetWithNullParameters() {
        val petDTO =
            petFactory.anyPetDTO("Firu", "image", null, "Perro", null, "Perdido", "aldana@gmail.com",
                vaccine = true,
                castrated = true,
                medicalHistory = null,
                description = null,
                coordinates = null
            )
        val pet =  petService.createPet(petDTO)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/${pet.id}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.length()").value(13))
            .andExpect(jsonPath("name").value("Firu"))
            .andExpect(jsonPath("image").value("image"))
            .andExpect(jsonPath("birth").value(null))
            .andExpect(jsonPath("type").value("Perro"))
            .andExpect(jsonPath("breed").value(null))
            .andExpect(jsonPath("state").value("Perdido"))
            .andExpect(jsonPath("user").value("aldana@gmail.com"))
            .andExpect(jsonPath("vaccine").value(true))
            .andExpect(jsonPath("castrated").value(true))
            .andExpect(jsonPath("medicalHistory").value(null))
            .andExpect(jsonPath("description").value(null))
            .andExpect(jsonPath("coordinates").value(null))
            .andExpect(jsonPath("id").value(pet.id))
    }

    @Test
    fun getByWrongID() {
       val errorMessage = mockMvc.perform(
           MockMvcRequestBuilders.get("/api/pet/${29}"))
           .andExpect(status().isNotFound)
           .andReturn()
           .resolvedException?.message
        assertEquals(errorMessage, "No existe ninguna mascota con ese id en la base de datos")
    }

    @Test
    fun getAllPetsCorrect() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/all"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$[0].name").value("Gatito"))
    }

    @Test
    fun searchByName() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/search?search=${"Gatito"}&closeness=&state=&type="))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$[0].name").value("Gatito"))
    }

    @Test
    fun searchStateLost() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/search?search=${""}&closeness=&state=${"Perdido"}&type="))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$[0].name").value("Gatito"))
    }

    @Test
    fun searchTypeCats() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/search?search=${""}&closeness=&state=&type=${"Gato"}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$[0].name").value("Gatito"))
    }

    @Test
    fun searchTypeDog() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/search?search=${""}&closeness=&state=&type=${"Perro"}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.length()").value(0))
    }


    @Test
    fun searchByBadWord() {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/search?search=${"Gatoosss"}&closeness=&state=&type="))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$.length()").value(0))
    }

    @Test
    fun getPetByUser() {
        val pet = petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/all/${pet.user}"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$[0].name").value("Gatito"))
    }
    @Test
    fun getNoPetByUser() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/all/aldanaaaa@gmail.com"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$.length()").value(0))
    }

    @Test
    fun getNearbyPets() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/nearby?latitude=-36.6769415180527&longitude=-60.5588319815719"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$[0].name").value("Gatito"))
    }

    @Test
    fun getNoNearbyPets() {
        petService.createPet(petFactory.anyPetDTO())
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/pet/nearby?latitude=0&longitude=0"))
            .andExpect(status().isOk)
            .andExpect(content().contentType("application/json"))
            .andExpect (jsonPath("$").isArray)
            .andExpect(jsonPath("$.length()").value(0))
    }

    @Test
    fun deleteByPetId() {
        val pet = petService.createPet(petFactory.anyPetDTO())
        val petsOne =  petController.getPetByID(pet.id!!).body as Pet
        assertEquals(petsOne.name, "Gatito")
        petController.deleteById(pet.id!!)
        assertThrows<PetNotFoundException>("No existe ninguna mascota con ese id en la base de datos") { petController.getPetByID(pet.id!!) }

    }
    @Test
    fun deleteAll() {
        petService.createPet(petFactory.anyPetDTO())
        val petsOne =  (petController.getAllPets() as MutableList<*>).size
        assertEquals(petsOne, 1)
        petController.deleteAll()
        val pets =  (petController.getAllPets() as MutableList<*>).size
        assertEquals(pets, 0)
    }
    @AfterEach
    fun tearDown() {
        petController.deleteAll()
        userController.deleteAll()
    }

}
