package mate4ever.ttip.repository

import mate4ever.ttip.model.Pet
import org.springframework.data.mongodb.repository.MongoRepository


interface PetRepository : MongoRepository<Pet, String> {
    fun findItemById(id: String): Pet?
    fun insert(pet: Pet): Pet
}