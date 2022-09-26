package mate4ever.ttip.service

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service

@Service
class PetService {
    @Autowired
    private lateinit var petRepository: PetRepository
    @Autowired
    private lateinit var mongoTemplate : MongoTemplate
    fun findById(id: String): Pet {
        return petRepository.findItemById(id)
            ?: throw IllegalArgumentException("No existe ninguna mascota con ese id en la base de datos")
    }

    fun findAll(): MutableIterable<Pet?> {
        return petRepository.findAll()
    }
    fun createPet(pet: Pet): Pet {
        return petRepository.insert(pet)
    }
    fun search(value: String): List<Pet?> {
        val nameCriteria = criteriaForm("name", value)
        val stateCriteria = criteriaForm("state", value)
        val typeCriteria = criteriaForm("type", value)
        val criteria = Criteria().orOperator(nameCriteria,stateCriteria, typeCriteria)
        val query = Query(criteria)
        return mongoTemplate.find(query, Pet::class.java)
    }

    private fun criteriaForm(fieldName: String, value: String) : Criteria{
        return Criteria.where(fieldName).regex(value, "i")
    }

    fun deleteAll() {
        return petRepository.deleteAll()
    }

    fun deleteById(id: String) {
        return petRepository.deleteById(id)
    }
}
