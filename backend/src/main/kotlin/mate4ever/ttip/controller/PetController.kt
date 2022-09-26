package mate4ever.ttip.controller

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
    @PostMapping("/api/pet/make")
    fun createPet(@RequestBody pet:Pet): ResponseEntity<*> {
        petService.createPet(pet)
        return ResponseEntity<Pet>(pet,null,HttpStatus.OK)
    }

//    @LogExecutionTime
    @GetMapping("/api/pet/{id}")
    fun getPet(@PathVariable(required = true) id : String): ResponseEntity<*> {
        return try {
            val pet = petService.findById(id)
            ResponseEntity<Pet>(pet,null,HttpStatus.OK)
        }catch (e:IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }
    }

    @GetMapping("/api/pet/all")
    fun getAllPets(): MutableIterable<Pet?> {
        return petService.findAll()
    }

    @GetMapping("/api/pet/search")
    fun searchBy(@RequestParam(required = true) query: String) : ResponseEntity<*> {
            val petsResponse = petService.search(query)
            return ResponseEntity<List<*>>(petsResponse,null,HttpStatus.OK)
    }
    fun deleteAll() {
        return petService.deleteAll()
    }
    fun deleteById(id: String) {
        return petService.deleteById(id)
    }
}
