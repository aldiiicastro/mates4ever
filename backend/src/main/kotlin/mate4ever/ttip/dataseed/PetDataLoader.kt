package mate4ever.ttip.dataseed

import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.model.User
import mate4ever.ttip.repository.PetRepository
import mate4ever.ttip.repository.UserRepository
import mate4ever.ttip.service.PetService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class PetDataLoader : CommandLineRunner {
    @Autowired
    private lateinit var petService: PetService
    @Autowired
    private lateinit var petRepository: PetRepository

    @Autowired
    private lateinit var userRepository: UserRepository

    @Throws(Exception::class)
    override fun run(vararg args: String?) {
        loadPetData()
    }

    fun loadPetData() {
        userRepository.deleteAll()
        petService.deleteAll()

        val user = User(null, "Mates4Ever", "Org", "mates4ever@gmail.com", "Ejemplo12", 1112345678, "Bernal", "Buenos Aires", "")

        val pets = listOf(
            PetRequestDTO("Mía", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Mia.jpg?raw=true",
                null,"Gato", null, "Transito", "mates4ever@gmail.com", true,true, null,"Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Siria", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Siria.jpg?raw=true",
                null,"Gato", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Oreo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Oreo.jpg?raw=true",
                null,"Gato", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Venom", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Venom.jpg?raw=true",
                null,"Gato", null, "Adopción", "mates4ever@gmail.com",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Moscú", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Moscu.jpeg?raw=true",
                null,"Gato", null, "Adopción", "mates4ever@gmail.com",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Leia", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Leia.jpg?raw=true",
                null,"Gato", null, "Adopción", "mates4ever@gmail.com",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Batman", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Batman.jpg?raw=true",
                null,"Gato", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Frappe", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Frappe.jpg?raw=true",
                null,"Gato", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Jabba", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Jabba.jpg?raw=true",
                null,"Gato", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Nella", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Nella.jpg?raw=true",
                null,"Conejo", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Luna", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Luna.jpg?raw=true",
                null,"Conejo", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Donut", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Donut.jpg?raw=true",
                null,"Conejo", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Curry", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Curry.jpg?raw=true",
                null,"Conejo", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Groot", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Groot.jpg?raw=true",
                null,"Conejo", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Jar jar", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Jar.jpg?raw=true",
                null,"Conejo", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Odie", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Odie.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Slinky", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Slinky.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Pongo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Pongo.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Frank", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Frank.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            PetRequestDTO("Milo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Milo.jpg?raw=true",
                null,"Perro", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Bingo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Bingo.jpg?raw=true",
                null,"Perro", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Gala", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Gala.jpg?raw=true",
                null,"Perro", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            PetRequestDTO("Kira", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Kira.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Linda", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Linda.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Nugget", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Nugget.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"),
            PetRequestDTO("Flash", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Flash.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa"))

        userRepository.insert(user)
        pets.forEach { pet: PetRequestDTO -> petService.createPet(pet) }
    }
}
