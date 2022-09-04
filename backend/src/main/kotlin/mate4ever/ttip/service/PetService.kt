package mate4ever.ttip.service

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class PetService {
    @Autowired
    private var petRepository: PetRepository? = null

    fun findById(id : String): Pet? {
        return petRepository!!.findItemById(id)
    }

    fun createPet(pet: Pet): Pet? {
        return petRepository!!.insert(pet)
    }
}