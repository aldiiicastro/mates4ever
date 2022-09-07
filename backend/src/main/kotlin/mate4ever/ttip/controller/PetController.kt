package mate4ever.ttip.controller

import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.PetService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.web.bind.annotation.*

@RestController
@EnableAutoConfiguration
class PetController {
    @Autowired
    private val petService: PetService? = null
//    @LogExecutionTime
    @PostMapping("/api/transfer/make")
    fun createPet(@RequestBody pet:Pet): Pet {
//        return try {
//            petService!!.createPet(pet)
//            ResponseEntity.status( HttpStatus.OK).body("Successful transfer")
//        }catch (e:Exception) {
//            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
//        }
        return petService!!.createPet(pet)!!
    }

//    @LogExecutionTime
    @GetMapping("/api/transfer/id")
    fun getPet(@RequestParam(required = true) id : String): Pet? {
//        return try {
//            val pet = petService!!.findById(id)
//            ResponseEntity.ok().body(pet)
//        }catch (e:Exception) {
//            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
//        }
        return petService!!.findById(id)
    }
    @GetMapping("/api/transfer/all")
    fun getAllPets(): MutableIterable<Pet?> {
        return petService!!.findALl()
    }

    @GetMapping("/api/transfer/search")
    fun searchBy(@RequestParam(required = true) string: String) : List<Pet?> {
        return petService!!.search(string)
    }
}
