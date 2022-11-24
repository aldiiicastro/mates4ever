package mate4ever.ttip.controllerTets

import com.fasterxml.jackson.databind.ObjectMapper
import mate4ever.ttip.controller.CommentController
import mate4ever.ttip.controller.PetController
import mate4ever.ttip.controller.UserController
import mate4ever.ttip.dto.CommentRequestDTO
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*


@SpringBootTest
@AutoConfigureMockMvc
class CommentControllerTest {
    @Autowired
    private lateinit var userController: UserController
    @Autowired
    private lateinit var petController: PetController
    @Autowired
    private lateinit var commentController: CommentController

    @Autowired
    private lateinit var mockMvc: MockMvc


    @Test
    fun createPet() {
        val coordinates = mapOf("latitude" to -34.7086053, "longitude" to -58.2809884)
        val comment = CommentRequestDTO(null, "29", mutableListOf(), "24/11/2022", "Un comentario", "aldana@gmail.com", coordinates)
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/comment/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().writeValueAsString(comment)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("petID").value("29"))
            .andExpect(jsonPath("image").value(mutableListOf<String>()))
            .andExpect(jsonPath("dateOfSeen").value("2022-11-24"))
            .andExpect(jsonPath("commentary").value("Un comentario"))
            .andExpect(jsonPath("contact").value("aldana@gmail.com"))
            .andExpect(jsonPath("coordinates").value(coordinates))

    }

    @Test
    fun createCommentWithNulls() {
        val comment = CommentRequestDTO(null, "29", null, null, "Un comentario", "aldana@gmail.com", null)
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/comment/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ObjectMapper().writeValueAsString(comment)))
            .andExpect(status().isOk)
            .andExpect(jsonPath("petID").value("29"))
            .andExpect(jsonPath("image").value(null))
            .andExpect(jsonPath("dateOfSeen").value(null))
            .andExpect(jsonPath("commentary").value("Un comentario"))
            .andExpect(jsonPath("contact").value("aldana@gmail.com"))
            .andExpect(jsonPath("coordinates").value(null))
    }

    @Test
    fun getCommentaryByPetID() {
        val comment = CommentRequestDTO(null, "29", null, null, "Un comentario", "aldana@gmail.com", null)
        commentController.createComment(comment)
        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/comment/${comment.petID}"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].petID").value("29"))
            .andExpect(jsonPath("$[0].image").value(null))
            .andExpect(jsonPath("$[0].dateOfSeen").value(null))
            .andExpect(jsonPath("$[0].commentary").value("Un comentario"))
            .andExpect(jsonPath("$[0].contact").value("aldana@gmail.com"))
            .andExpect(jsonPath("$[0].coordinates").value(null))
    }

//    @Test
//    fun createCommentWithNullCommentary() {
//        val comment = CommentRequestDTO(null, "29", null, null,  "", "aldana@gmail.com", null)
//        mockMvc.perform(
//            MockMvcRequestBuilders.post("/api/comment/create")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(ObjectMapper().writeValueAsString(comment)))
//            .andExpect(status().isOk)
//    }


    @AfterEach
    fun tearDown() {
        commentController.deleteAll()
        petController.deleteAll()
        userController.deleteAll()
    }
}
