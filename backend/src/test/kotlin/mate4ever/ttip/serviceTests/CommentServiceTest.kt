package mate4ever.ttip.serviceTests

import mate4ever.ttip.dto.CommentRequestDTO
import mate4ever.ttip.service.CommentService
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class CommentServiceTest {
    @Autowired
    private lateinit var commentService: CommentService
    @Test
    fun createComment() {
        val coordinates = mapOf("latitude" to -34.7086053, "longitude" to -58.2809884)
        val comment = CommentRequestDTO(null, "29", mutableListOf(), "24/11/2022", "Un comentario", "aldana@gmail.com", coordinates)
        val commentSaved = commentService.createComment(comment)
        assertEquals(commentSaved.commentary, comment.commentary)
        assertEquals(commentSaved.petID, comment.petID)
        assertEquals(commentSaved.contact, comment.contact)
    }
    @Test
    fun createAndFindByPetID() {
        val coordinates = mapOf("latitude" to -34.7086053, "longitude" to -58.2809884)
        val comment = CommentRequestDTO(null, "29", mutableListOf(), "24/11/2022", "Un comentario", "aldana@gmail.com", coordinates)
        commentService.createComment(comment)
        val commentSaved = commentService.findCommentByPetID("29")
        assertEquals(commentSaved.first().commentary, comment.commentary)
        assertEquals(commentSaved.first().petID, comment.petID)
        assertEquals(commentSaved.first().contact, comment.contact)
    }
    @AfterEach
    fun tearDown() {
        commentService.deleteAll()
    }
}
