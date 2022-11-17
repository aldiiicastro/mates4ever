package mate4ever.ttip.repository

import mate4ever.ttip.model.Comment
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository


@Configuration
@Repository
interface CommentRepository : MongoRepository<Comment?, String?> {
    fun insert(comment: Comment): Comment
    fun findByPetID(petID: String): MutableIterable<Comment>
}
