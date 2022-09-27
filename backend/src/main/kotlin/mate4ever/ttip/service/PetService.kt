package mate4ever.ttip.service

import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class PetService {
    @Autowired
    private lateinit var petRepository: PetRepository
    @Autowired
    private lateinit var mongoTemplate : MongoTemplate

    @Transactional(readOnly = true)
    fun findById(id: String): Pet {
        return petRepository.findItemById(id)
            ?: throw PetNotFoundException("No existe ninguna mascota con ese id en la base de datos")
    }

    @Transactional(readOnly = true)
    fun findAll(): MutableIterable<Pet?> {
        return petRepository.findAll()
    }
    fun createPet(pet: Pet): Pet {
        return petRepository.insert(pet)
    }

    @Transactional(readOnly = true)
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
