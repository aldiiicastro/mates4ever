package mate4ever.ttip.service

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

    fun createComment(comment: Comment): Comment {
        return commentRepository.insert(comment)
    }

    fun findCommentByPetID(petID: String): Any {
        return commentRepository.findByPetID(petID)
    }
}
