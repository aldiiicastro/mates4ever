package mate4ever.ttip.service

import AESEncryptorGCM
import mate4ever.ttip.exceptions.UserIncorrectArgumentsException
import mate4ever.ttip.exceptions.UserNotFoundException
import mate4ever.ttip.model.User
import mate4ever.ttip.dto.UserDTO
import mate4ever.ttip.dto.UserEmailResponseDTO
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
    private var commonMethods: CommonMethods = CommonMethods()
    //Create user
    fun createUser(user: User): User {
        user.password = encryptor.encrypt(user.password, secretKey).toString()
        return userRepository.insert(user)
    }
    //Search user by password and email.
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
    //Get user nearby.
    fun getNearby(lat: Double, long : Double): List<UserEmailResponseDTO> {
        val document =
            mongoTemplate.executeCommand("{ find: 'user', filter : "+ commonMethods.nearbyQuery(0.02, lat, long) + "}")
        val listOfPets = (document["cursor"] as Map<*, *>)["firstBatch"] as List<Map<String, *>>
        return listOfPets.map {
            UserEmailResponseDTO(
                it["email"] as String,
                it["expoPushToken"] as String
            )
        }
    }
    //Get user by email.
    @Transactional(readOnly = true)
    fun findUserByEmail(email: String): User? {
        return userRepository.findByEmail(email)
            ?: throw UserNotFoundException("El mail o la contraseña son incorrectos")
    }
    //********** AUXILIARIES FUNCTION ********************************************
    private fun criteriaForm(fieldName: String, value: String): Criteria {
        return Criteria.where(fieldName).`is`(value)
    }
    //********** DOESN'T USE IN FRONT ********************************************
    @Transactional(readOnly = true)
    fun findUserBy(id: String): User {
        return userRepository.findItemById(id)
            ?: throw UserNotFoundException("No existe ningún usuario con ese id en la base de datos")
    }

    @Transactional(readOnly = true)
    fun findAllUsers(): MutableList<User?> {
        return userRepository.findAll()
    }
    fun deleteAll() {
        return userRepository.deleteAll()
    }

}
