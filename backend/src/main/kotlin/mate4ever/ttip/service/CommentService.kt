package mate4ever.ttip.service

import mate4ever.ttip.dto.CommentRequestDTO
import mate4ever.ttip.model.Comment
import mate4ever.ttip.repository.CommentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class CommentService {
    @Autowired
    lateinit var commentRepository : CommentRepository
    private var commonMethods: CommonMethods = CommonMethods()
    @Transactional
    fun createComment(commentDTO: CommentRequestDTO): Comment {
        val dateOfSeen = commonMethods.parseLocalDate(commentDTO.dateOfSeen)
        val comment = Comment(commentDTO.id, commentDTO.petID, commentDTO.image,dateOfSeen, commentDTO.commentary, commentDTO.contact, commentDTO.coordinates)
        return commentRepository.insert(comment)
    }
    @Transactional
    fun findCommentByPetID(petID: String): MutableIterable<Comment> {
        return commentRepository.findByPetID(petID)
    }

    @Transactional
    fun deleteAll() {
        return commentRepository.deleteAll()
    }
}
