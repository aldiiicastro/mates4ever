package mate4ever.ttip.service

import mate4ever.ttip.dto.PetDocumentDTO
import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.bson.types.ObjectId
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

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

    @Transactional(readOnly = true)
    fun findPetByUser(user: String): MutableIterable<Pet> {
        return petRepository.findByUser(user)
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
            petDTO.description,
            petDTO.coordinates
        )

        val petSaved = petRepository.insert(pet)
        userService.addPet(petDTO.tutor, petSaved.id!!)
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

    fun getNearbyPets(lat: Double, long : Double): List<PetDocumentDTO> {
        val document =
            mongoTemplate.executeCommand("{ find: 'pet', filter : {\$where: 'this.coordinates && Math.abs(this.coordinates.latitude - $lat) <= 0.02 &&  Math.abs(this.coordinates.longitude - $long) <= 0.02 '}}")
        val listOfPets = (document["cursor"] as Map<*, *>)["firstBatch"] as List<Map<String, *>>
        return listOfPets.map { it ->
            PetDocumentDTO(
                (listOfPets[0]["_id"] as ObjectId).toString(),
                it["name"] as String,
                it["image"] as String,
                dateToLocalDate(it["birth"] as Date?),
                it["type"] as String,
                it["breed"] as String?,
                it["state"] as String,
                it["user"] as String,
                it["vaccine"] as Boolean,
                it["castrated"] as Boolean,
                it["medicalHistory"] as String?,
                it["description"] as String?,
                it["coordinates"] as Map<String,Double>?
            )
        }
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
    fun dateToLocalDate(date: Date?) : LocalDate? {
        return if (date != null) {
            val calendar: Calendar = GregorianCalendar()
            calendar.time = date
            LocalDate.of(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH)+1, calendar.get(Calendar.DATE))
        }else{
            null
        }
    }



}
