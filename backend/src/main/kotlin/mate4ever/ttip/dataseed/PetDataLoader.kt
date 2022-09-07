package mate4ever.ttip.dataseed

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class PetDataLoader: CommandLineRunner {
    @Autowired
    private var petRepository: PetRepository? = null

    @Throws(Exception::class)
    override fun run(vararg args: String?) {
        loadPetData()
    }
    fun loadPetData() {
        petRepository!!.deleteAll()
        val pet1 = Pet("Firu", "image", 5, null,"Dog", "none", "Lost", "Anto", "Lo encontre en la puerta de mi casa")
        val pet2 = Pet("Firu", "image", 5, null,"Dog", "none", "Transit", "Aldi", null)
        petRepository!!.insert(pet1)
        petRepository!!.insert(pet2)
    }

}
