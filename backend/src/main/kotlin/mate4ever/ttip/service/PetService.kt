package mate4ever.ttip.service

import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Service
@Transactional
class PetService {
    @Autowired
    private lateinit var petRepository: PetRepository

    @Autowired
    private lateinit var userService: UserService

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate

    @Transactional(readOnly = true)
    fun findById(id: String): Pet {
        return petRepository.findItemById(id)
            ?: throw PetNotFoundException("No existe ninguna mascota con ese id en la base de datos")
    }

    @Transactional(readOnly = true)
    fun findAll(): MutableIterable<Pet?> {
        return petRepository.findAll()
    }

    fun getPets(pets: MutableList<String>): Iterable<Pet>? {
        return petRepository.findAllThin(pets)
    }

    fun createPet(petDTO: PetRequestDTO): Pet {
        val pet = Pet(
            petDTO.name,
            petDTO.image,
            parseLocalDate(petDTO.birth),
            petDTO.type,
            petDTO.breed,
            petDTO.state,
            petDTO.tutor,
            petDTO.vaccine,
            petDTO.castrated,
            petDTO.medicalHistory,
            petDTO.description
        )

        val petSaved = petRepository.insert(pet)
        userService.addPet(petDTO.tutor,petSaved.id!!)
        return petSaved
    }

    @Transactional(readOnly = true)
    fun search(value: String): List<Pet?> {
        val nameCriteria = criteriaForm("name", value)
        val stateCriteria = criteriaForm("state", value)
        val typeCriteria = criteriaForm("type", value)
        val criteria = Criteria().orOperator(nameCriteria, stateCriteria, typeCriteria)
        val query = Query(criteria)
        return mongoTemplate.find(query, Pet::class.java)
    }

    private fun criteriaForm(fieldName: String, value: String): Criteria {
        return Criteria.where(fieldName).regex(value, "i")
    }

    fun deleteAll() {
        return petRepository.deleteAll()
    }

    fun deleteById(id: String) {
        return petRepository.deleteById(id)
    }

    private fun parseLocalDate(date: String?): LocalDate? {
        return if (date != null) {
            val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
            LocalDate.parse(date, formatter)
        } else {
            null
        }
    }

}
