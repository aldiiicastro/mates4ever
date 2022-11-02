package mate4ever.ttip.repository

import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Configuration
@Repository
interface PetRepository : MongoRepository<Pet?, String?> {
    fun findItemById(id: String): Pet?
    fun insert(pet: Pet): Pet
    fun findByUser(user: String) : MutableIterable<Pet>
    @Query(value = "{ '_id' : {'\$in' : ?0 } }", fields = "{ 'description': 0 }")
    fun findAllThin(ids: Iterable<String?>?): Iterable<Pet>?
//    override fun deleteAll()
}
