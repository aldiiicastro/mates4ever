package mate4ever.ttip.service

import mate4ever.ttip.model.User
import mate4ever.ttip.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService {
    @Autowired
    private lateinit var userRepository: UserRepository

    @Transactional(readOnly = true)
    fun findUserBy(id: String): User {
        return userRepository.findUserBy(id)
            ?: throw IllegalArgumentException("No existe ningun usuario con ese id en la base de datos")
    }
    @Transactional(readOnly = true)
    fun findAllUsers(): MutableList<User?> {
        return userRepository.findAll()
    }

    fun createUser(user: User): User {
        return userRepository.insert(user)
    }

    fun deleteAll() {
        return userRepository.deleteAll()
    }

    fun deleteById(id: String) {
        return userRepository.deleteById(id)
    }
}
