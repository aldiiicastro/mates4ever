package mate4ever.ttip.repositoryTests

import mate4ever.ttip.model.Comment
import mate4ever.ttip.repository.CommentRepository
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@SpringBootTest
class CommentRepositoryTest {
    @Autowired
    private lateinit var commentRepository: CommentRepository
    @Test
    fun createComment() {
        val coordinates = mapOf("latitude" to -34.7086053, "longitude" to -58.2809884)
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        val comment = Comment(null, "29", mutableListOf(), LocalDate.parse("24/11/2022", formatter), "Un comentario", "aldana@gmail.com", coordinates)
        val commentSaved = commentRepository.insert(comment)
        Assertions.assertEquals(commentSaved.commentary, comment.commentary)
        Assertions.assertEquals(commentSaved.petID, comment.petID)
        Assertions.assertEquals(commentSaved.contact, comment.contact)
    }
    @Test
    fun createAndFindByPetID() {
        val coordinates = mapOf("latitude" to -34.7086053, "longitude" to -58.2809884)
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
        val comment = Comment(null, "29", mutableListOf(), LocalDate.parse("24/11/2022", formatter), "Un comentario", "aldana@gmail.com", coordinates)
        commentRepository.insert(comment)
        val commentSaved = commentRepository.findByPetID("29")
        Assertions.assertEquals(commentSaved.first().commentary, comment.commentary)
        Assertions.assertEquals(commentSaved.first().petID, comment.petID)
        Assertions.assertEquals(commentSaved.first().contact, comment.contact)
    }
    @AfterEach
    fun tearDown() {
        commentRepository.deleteAll()
    }
}
