package mate4ever.ttip.controller

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
    //    @LogExecutionTime
    @PostMapping("/api/user/make")
    fun createUser(@RequestBody user: User): ResponseEntity<*> {
        userService.createUser(user)
        return ResponseEntity<User>(user,null, HttpStatus.OK)
    }

    //    @LogExecutionTime
    @GetMapping("/api/user/{id}")
    fun getUser(@PathVariable(required = true) id : String): ResponseEntity<*> {
        return try {
            val user = userService.findUserBy(id)
            ResponseEntity<User>(user,null, HttpStatus.OK)
        }catch (e:IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.message)
        }
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
