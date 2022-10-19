package mate4ever.ttip.controller

import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.model.User
import mate4ever.ttip.dto.UserDTO
import mate4ever.ttip.dto.UserResponseDTO
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

    @PostMapping("/api/user/create")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        userService.createUser(user)
        val userDTO = UserDTO(user.email, user.password)
        return ResponseEntity<UserDTO>(userDTO, null, HttpStatus.OK)
    }

    @GetMapping("/api/user/{id}")
    fun getUserBy(@PathVariable(required = true) id: String): ResponseEntity<*> {
        val user = userService.findUserBy(id)
        return ResponseEntity<User>(user, null, HttpStatus.OK)
    }

    @GetMapping("/api/user/email/{email}")
    fun getUser(@PathVariable(required = true) email: String): ResponseEntity<*> {
        val user = userService.findUserbyEmail(email)
        return ResponseEntity<UserDTO>(UserDTO(user!!.email, user.password), null, HttpStatus.OK)
    }
    @GetMapping("/api/user/allData/{email}")
    fun getCompleteUser(@PathVariable(required = true) email: String): ResponseEntity<*> {
        val user = userService.findUserbyEmail(email)
        val userDTO = UserResponseDTO(user!!.name, user.lastname, user.email, user.phone, user.municipality, user.province, user.image, user.pets.map { PetRequestDTO(it.name, it.image, it.birth.toString(), it.type, it.breed, it.state, user.name, it.vaccine, it.castrated, it.medicalHistory,  it.description) })
        return ResponseEntity<UserResponseDTO>(userDTO, null, HttpStatus.OK)
    }
    @GetMapping("/api/user/all")
    fun getAllUsers(): MutableIterable<User?> {
        return userService.findAllUsers()
    }

    fun deleteAll() {
        return userService.deleteAll()
    }

    fun deleteById(id: String) {
        return userService.deleteById(id)
    }
}
