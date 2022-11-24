package mate4ever.ttip.service

import AESEncryptorGCM
import mate4ever.ttip.exceptions.UserIncorrectArgumentsException
import mate4ever.ttip.exceptions.UserNotFoundException
import mate4ever.ttip.model.User
import mate4ever.ttip.dto.UserDTO
import mate4ever.ttip.repository.UserRepository
import mate4ever.ttip.security.secretKey
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService {
    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate
    var encryptor = AESEncryptorGCM()
    @Transactional(readOnly = true)
    fun findUserBy(id: String): User {
        return userRepository.findItemById(id)
            ?: throw UserNotFoundException("No existe ningun usuario con ese id en la base de datos")
    }

    @Transactional(readOnly = true)
    fun findUser(user: UserDTO): User? {
        lateinit var query : Query
        try {
            val password = encryptor.encrypt(user.password, secretKey)
            val stateCriteria = criteriaForm("email", user.email)
            val typeCriteria = criteriaForm("password", password!!)
            val criteria = Criteria().andOperator(stateCriteria, typeCriteria)
            query = Query(criteria)
        } catch (error : NegativeArraySizeException) {
            throw UserIncorrectArgumentsException("El mail o la contraseña son incorrectos")
        }
        return mongoTemplate.findOne(query, User::class.java)
            ?: throw UserIncorrectArgumentsException("El mail o la contraseña son incorrectos")
    }

    @Transactional(readOnly = true)
    fun findUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
            ?: throw UserNotFoundException("El mail o la contraseña son incorrectos")
    }

    @Transactional(readOnly = true)
    fun findAllUsers(): MutableList<User?> {
        return userRepository.findAll()
    }


    fun createUser(user: User): User {
        user.password = encryptor.encrypt(user.password, secretKey).toString()
        return userRepository.insert(user)
    }

    private fun criteriaForm(fieldName: String, value: String): Criteria {
        return Criteria.where(fieldName).`is`(value)
    }

    fun deleteAll() {
        return userRepository.deleteAll()
    }

    fun addPet(email: String, petID: String){
        val user = findUserByEmail(email)!!
        user.addPet(petID)
        userRepository.save(user)
    }
}
