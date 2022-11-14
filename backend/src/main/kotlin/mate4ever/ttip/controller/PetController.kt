package mate4ever.ttip.controller

import com.mongodb.client.AggregateIterable
import mate4ever.ttip.dto.PetDocumentDTO
import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.dto.PetResponseDTO
import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.PetService
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@EnableAutoConfiguration
class PetController {
    @Autowired
    private lateinit var petService: PetService

    //    @LogExecutionTime
    @PostMapping("/api/pet/create")
    fun createPet(@RequestBody petDTO: PetRequestDTO): ResponseEntity<*> {
        val pet = petService.createPet(petDTO)
        return ResponseEntity<Pet>(pet, null, HttpStatus.OK)
    }

    //    @LogExecutionTime
    @GetMapping("/api/pet/{id}")
    fun getPet(@PathVariable(required = true) id: String): ResponseEntity<*> {
        val pet = petService.findById(id)
        return ResponseEntity<Pet>(pet, null, HttpStatus.OK)
    }
    @GetMapping("/api/pets/{user}")
    fun getPetByUser(@PathVariable(required = true) user: String): ResponseEntity<*> {
        val pets = petService.findPetByUser(user)
        return ResponseEntity(pets, null, HttpStatus.OK)
    }
    @GetMapping("/api/pet/all")
    fun getAllPets(): MutableIterable<Pet?> {
        return petService.findAll()
    }

    @GetMapping("/api/pet/search")
    fun searchBy(@RequestParam(required = true) query: String): ResponseEntity<*> {
        val petsResponse = petService.search(query)
        return ResponseEntity<List<*>>(petsResponse.map {
            PetResponseDTO(
                it!!.id!!,
                it.name,
                it.image,
                it.birth.toString(),
                it.type,
                it.breed,
                it.state,
                it.user,
                it.vaccine,
                it.castrated,
                it.medicalHistory,
                it.description
            )
        }, null, HttpStatus.OK)
    }

    @GetMapping("/api/pet/getNearbyPets")
    fun getNearbyPets(): List<PetRequestDTO> {
        return petService.getNearbyPets()
    }
    fun deleteAll() {
        return petService.deleteAll()
    }

    fun deleteById(id: String) {
        return petService.deleteById(id)
    }
}
