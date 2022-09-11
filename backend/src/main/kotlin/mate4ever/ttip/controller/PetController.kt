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
    @PostMapping("/api/transfer/make")
    fun createPet(@RequestBody pet:Pet): ResponseEntity<*> {
        return try {
            petService.createPet(pet)
            ResponseEntity<Pet>(pet,null,HttpStatus.OK)
        }catch (e:Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }
//        return petService!!.createPet(pet)!!
    }

//    @LogExecutionTime
    @GetMapping("/api/transfer/{id}")
    fun getPet(@PathVariable(required = true) id : String): ResponseEntity<*> {
        return try {
            val pet = petService.findById(id)
            ResponseEntity<Pet>(pet,null,HttpStatus.OK)
        }catch (e:Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }
//        return petService!!.findById(id)
    }
    @GetMapping("/api/transfer/all")
    fun getAllPets(): MutableIterable<Pet?> {
        return petService.findAll()
    }

    @GetMapping("/api/transfer/one")
    fun findone(): Pet? {
        return petService.findAll().first()
    }

    @GetMapping("/api/transfer/search")
    fun searchBy(@RequestParam(required = true) query: String) : ResponseEntity<*> {
            val petsResponse = petService.search(query)
            print(petsResponse)
            return ResponseEntity<List<*>>(petsResponse,null,HttpStatus.OK)
    }
}
