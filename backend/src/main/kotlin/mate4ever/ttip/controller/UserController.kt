package mate4ever.ttip.controller

import mate4ever.ttip.dto.*
import mate4ever.ttip.model.User
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

    //Create user. Return only email, password and expoPush.
    @PostMapping("/api/user/create")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        userService.createUser(user)
        val userDTO = UserDTO(user.email, user.password, user.expoPushToken)
        return ResponseEntity<UserDTO>(userDTO, null, HttpStatus.OK)

    }
    //Search user by password and email. Return only email, password and expoPush.
    @PostMapping("/api/user/userData")
    fun getUser(@RequestBody userData : UserDTO): ResponseEntity<*> {
        val user = userService.findUser(userData)
        return ResponseEntity<UserDTO>(UserDTO(user!!.email, user.password, user.expoPushToken),null, HttpStatus.OK)
    }
    //Get user nearby. Return only email and expoPushToken
    @GetMapping("/api/user/nearby")
    fun getNearbyUser(
        @RequestParam latitude: Double,
        @RequestParam longitude: Double
    ): List<UserEmailResponseDTO> {
        return userService.getNearby(latitude, longitude)
    }
    //Get user by email. Return only email and expoPushToken.
    @GetMapping("/api/user/email/{email}")
    fun getUser(@PathVariable(required = true) email: String): ResponseEntity<*> {
        val user = userService.findUserByEmail(email)
        return ResponseEntity<UserEmailResponseDTO>(UserEmailResponseDTO(user!!.email, user.expoPushToken), null, HttpStatus.OK)
    }
    //Get all most the complete user
    @GetMapping("/api/user/allData/{email}")
    fun getCompleteUser(@PathVariable(required = true) email: String): ResponseEntity<*> {
        val user = userService.findUserByEmail(email)
        val userDTO = UserResponseDTO(user!!.name, user.lastname, user.email, user.phone, user.coordinates, user.image)
        return ResponseEntity<UserResponseDTO>(userDTO, null, HttpStatus.OK)
    }

    //********** DOESN'T USE IN FRONT*********************************************
    @GetMapping("/api/user/{id}")
    fun getUserBy(@PathVariable(required = true) id: String): ResponseEntity<*> {
        val user = userService.findUserBy(id)
        return ResponseEntity<User>(user, null, HttpStatus.OK)
    }
    @GetMapping("/api/user/all")
    fun getAllUsers() : List<UserResponseDTO> {
        return userService.findAllUsers().map { UserResponseDTO(it!!.name, it.lastname, it.email, it.phone, it.coordinates, it.image) }
    }
    fun deleteAll() {
        return userService.deleteAll()
    }

}
