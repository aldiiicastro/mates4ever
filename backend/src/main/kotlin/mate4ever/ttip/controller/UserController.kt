package mate4ever.ttip.controller

import mate4ever.ttip.model.User
import mate4ever.ttip.dto.UserDTO
import mate4ever.ttip.dto.UserResponseDTO
import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.PetService
import mate4ever.ttip.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@EnableAutoConfiguration
class UserController {
    @Autowired
    private lateinit var userService: UserService
    @Autowired
    private lateinit var petService: PetService

    @PostMapping("/api/user/create")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        userService.createUser(user)
        val userDTO = UserDTO(user.email, user.password)
        return ResponseEntity<UserDTO>(userDTO, null, HttpStatus.OK)

    }
    @PostMapping("/api/user/userData")
    fun getUser(@RequestBody userData : UserDTO): ResponseEntity<*> {
        val user = userService.findUser(userData)
        return ResponseEntity<UserDTO>(UserDTO(user!!.email, user.password),null, HttpStatus.OK)
    }
    @GetMapping("/api/user/{id}")
    fun getUserBy(@PathVariable(required = true) id: String): ResponseEntity<*> {
        val user = userService.findUserBy(id)
        return ResponseEntity<User>(user, null, HttpStatus.OK)
    }

    @GetMapping("/api/user/email/{email}")
    fun getUser(@PathVariable(required = true) email: String): ResponseEntity<*> {
        val user = userService.findUserByEmail(email)
        return ResponseEntity<UserDTO>(UserDTO(user!!.email, user.password), null, HttpStatus.OK)
    }
    @GetMapping("/api/user/allData/{email}")
    fun getCompleteUser(@PathVariable(required = true) email: String): ResponseEntity<*> {
        val user = userService.findUserByEmail(email)
        val pets = petService.getPets(user!!.pets)
        val userDTO = UserResponseDTO(user.name, user.lastname, user.email, user.phone,user.street, user.streetNumber, user.municipality, user.province, user.image, pets)
        return ResponseEntity<UserResponseDTO>(userDTO, null, HttpStatus.OK)
    }
    @GetMapping("/api/user/all")
    fun getAllUsers(): MutableIterable<User?> {
        return userService.findAllUsers()
    }

    @GetMapping("/api/user/{email}/pets")
    fun searchBy(@PathVariable(required = true) email: String): Iterable<Pet?>? {
        val user = userService.findUserByEmail(email)
        val pets = petService.getPets(user!!.pets)
        return pets
    }


    fun deleteAll() {
        return userService.deleteAll()
    }

    fun deleteById(id: String) {
        return userService.deleteById(id)
    }
}
