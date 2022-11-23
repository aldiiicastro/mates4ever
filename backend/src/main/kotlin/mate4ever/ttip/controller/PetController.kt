package mate4ever.ttip.controller

import mate4ever.ttip.dto.PetDocumentDTO
import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.PetService
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
    fun searchBy(
        @RequestParam search: String,
        @RequestParam closeness: List<Double>,
        @RequestParam state: List<String>,
        @RequestParam type: List<String>
    ): List<PetDocumentDTO> {
        val petsResponse = petService.search(search, closeness, state, type)
        return petsResponse
    }

    @GetMapping("/api/pet/getNearbyPets")
    fun getNearbyPets(
        @RequestParam latitude: Double,
        @RequestParam longitude: Double
    ): List<PetDocumentDTO> {
        return petService.getNearbyPets(latitude, longitude)
    }

    fun deleteAll() {
        return petService.deleteAll()
    }

    @DeleteMapping("api/pet/delete/{id}")
    fun deleteById(@PathVariable id: String) {
        return petService.deleteById(id)
    }
}
