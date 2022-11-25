package mate4ever.ttip.repository

import mate4ever.ttip.model.Pet
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Configuration
@Repository
interface PetRepository : MongoRepository<Pet?, String?> {
    fun findItemById(id: String): Pet?
    fun insert(pet: Pet): Pet
    fun findByUser(user: String) : MutableIterable<Pet>
}
