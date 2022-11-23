package mate4ever.ttip.service

import mate4ever.ttip.dto.PetDocumentDTO
import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.exceptions.PetNotFoundException
import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.bson.types.ObjectId
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
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
    fun search(value: String, closeness: List<Double>, state: List<String>, type: List<String>): List<PetDocumentDTO> {
        val valueQuery = if (value != "") searchByValuePetQuery(value) else ""
        val closenessQuery = if (closeness.isNotEmpty() && closeness.size == 3) nearbyPetQuery(closeness[0], closeness[1], closeness[2]) else ""
        val stateQuery = if (state.isNotEmpty()) statePetQuery(state) else ""
        val typeQuery = if (type.isNotEmpty()) typePetQuery(type) else ""

        val jsonCommand = "{ find: 'pet', filter : {\$and : [ {} $valueQuery  $closenessQuery $stateQuery $typeQuery]  }}"

        val document = mongoTemplate.executeCommand( jsonCommand )

        val listOfPets = (document["cursor"] as Map<*, *>)["firstBatch"] as List<Map<String, *>>

        return listOfPets.map { it ->
            PetDocumentDTO(
                (it["_id"] as ObjectId).toString(),
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

    fun getNearbyPets(lat: Double, long : Double): List<PetDocumentDTO> {
        val document =
            mongoTemplate.executeCommand("{ find: 'pet', filter : "+ nearbyPetQuery(0.02, lat, long) + "}")
        val listOfPets = (document["cursor"] as Map<*, *>)["firstBatch"] as List<Map<String, *>>
        return listOfPets.map { it ->
            PetDocumentDTO(
                (it["_id"] as ObjectId).toString(),
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

    fun nearbyPetQuery(km:Double, lat: Double, long: Double): String {
        return " { \$where: 'this.coordinates && Math.abs(this.coordinates.latitude - $lat) <= $km &&  Math.abs(this.coordinates.longitude - $long) <= $km' }"
    }

    fun searchByValuePetQuery(value: String): String {
        return "{ \$or : [{ name : {'\$regex': '$value' , '\$options': 'i'} } { state : {'\$regex': '$value' , '\$options': 'i'}} { type : {'\$regex': '$value' , '\$options': 'i'}}] }"
    }

    private fun typePetQuery(type: List<String>): String {
        return "{ \$or : [ " + type.map { v1-> "{ type : '$v1' }" }.reduce { v1, v2 -> v1 + v2 } + "] }"
    }

    private fun statePetQuery(state: List<String>): String {
        return  "{ \$or : [ " + state.map { v1 -> "{ state : '$v1' }" }.reduce { v1, v2 -> v1 + v2 } + "] }"
    }


}
