package mate4ever.ttip.service

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class PetService {
    @Autowired
    private var petRepository: PetRepository? = null

    fun findById(id : String): Pet? {
        return petRepository!!.findItemById(id)
    }

    fun findAll(): MutableIterable<Pet?> {
        return petRepository!!.findAll()
    }
    fun createPet(pet: Pet): Pet? {
        return petRepository!!.insert(pet)
    }
    fun search(string: String): List<Pet?> {
        return petRepository!!.findAll().filter { pet: Pet? -> searchFor(pet!!, string) }
    }
    private fun searchFor(pet: Pet, string : String) : Boolean {
        var name = pet.name
        var breed =  pet.breed
        var description = pet.description
        var state = pet.state
        var tutor = pet.tutor
        var type = pet.type
        return containsFor(name, string) || containsFor(breed, string) || containsFor(description, string)
                || containsFor(state, string) || containsFor(tutor, string) || containsFor(type, string)
    }

    private fun containsFor(petField : String?, string: String) : Boolean {
        return (petField != null) && petField.contains(string, ignoreCase = true)
    }
}