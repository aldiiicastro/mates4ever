package mate4ever.ttip.repository

import mate4ever.ttip.model.User
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Configuration
@Repository
interface UserRepository : MongoRepository<User?, String?> {
    fun findItemById(id: String): User?
    fun insert(user: User): User
    fun findByEmail(email: String): User?
}
