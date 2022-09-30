package mate4ever.ttip.modelTests

import mate4ever.ttip.dataHelpers.PetFactory
import mate4ever.ttip.dataHelpers.UserFactory
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserTest {
    private val userFactory : UserFactory = UserFactory()
    @Test
    fun createUserTest() {
        val user = userFactory.anyUser(pets=listOf(PetFactory().anyPet()))
        assert(user.name == "Aldana")
        assert(user.lastname == "Castro")
        assert(user.image == "Example")
        assert(user.email == "aldana@gmail.com")
        assert(user.password == "contrasena...")
        assert(user.phone == 1139538873)
        assert(user.location == "Quilmes")
        assert(user.pets!!.size == 1)
        assert(user.pets!![0].name == "Gatito")
    }
}
