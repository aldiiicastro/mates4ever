package mate4ever.ttip.service

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class PetService {
    @Autowired
    private lateinit var petRepository: PetRepository

    fun findById(id : String): Pet? {
        return petRepository.findItemById(id)
    }

    fun findAll(): MutableIterable<Pet?> {
        return petRepository.findAll()
    }
    fun createPet(pet: Pet): Pet? {
        return petRepository.insert(pet)
    }
    fun search(query: String): List<Pet?> {
        val pets = petRepository.findAll()
        return  if (query.isEmpty()) {
             pets
        }
        else {
             pets.filter { pet: Pet? -> searchFor(pet!!, query) }
        }

    }
    private fun searchFor(pet: Pet, string : String) : Boolean {
        val name = pet.name
        val breed =  pet.breed
        val description = pet.description
        val state = pet.state
        val tutor = pet.tutor
        val type = pet.type
        return containsFor(name, string) || containsFor(breed, string) || containsFor(description, string)
                || containsFor(state, string) || containsFor(tutor, string) || containsFor(type, string)
    }

    private fun containsFor(petField : String?, query: String) : Boolean {
        return (petField != null) && petField.contains(query, ignoreCase = true)
    }
}