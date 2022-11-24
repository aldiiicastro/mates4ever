package mate4ever.ttip.service

import mate4ever.ttip.dto.CommentRequestDTO
import mate4ever.ttip.model.Comment
import mate4ever.ttip.repository.CommentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Service
@Transactional
class CommentService {
    @Autowired
    lateinit var commentRepository : CommentRepository
    @Transactional
    fun createComment(commentDTO: CommentRequestDTO): Comment {
        val dateOfSeen = parseLocalDate(commentDTO.dateOfSeen)
        val comment = Comment(commentDTO.id, commentDTO.petID, commentDTO.image,dateOfSeen, commentDTO.commentary, commentDTO.contact, commentDTO.coordinates)
        return commentRepository.insert(comment)
    }
    @Transactional
    fun findCommentByPetID(petID: String): MutableIterable<Comment> {
        return commentRepository.findByPetID(petID)
    }

    private fun parseLocalDate(date: String?): LocalDate? {
        return if (date != null) {
            val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
            LocalDate.parse(date, formatter)
        } else {
            null
        }

    }
    @Transactional
    fun deleteAll() {
        return commentRepository.deleteAll()
    }
}
