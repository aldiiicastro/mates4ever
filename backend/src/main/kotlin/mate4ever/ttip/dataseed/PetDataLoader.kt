package mate4ever.ttip.dataseed

import mate4ever.ttip.dto.PetRequestDTO
import mate4ever.ttip.model.User
import mate4ever.ttip.repository.UserRepository
import mate4ever.ttip.service.CommentService
import mate4ever.ttip.service.PetService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class PetDataLoader : CommandLineRunner {
    @Autowired
    private lateinit var petService: PetService

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var commentService: CommentService
    @Throws(Exception::class)
    override fun run(vararg args: String?) {
        loadPetData()
    }

    fun loadPetData() {
        userRepository.deleteAll()
        petService.deleteAll()
        commentService.deleteAll()
        val user = User(null, "Mates4Ever", "Org", "mates4ever@gmail.com", "qriRBfSToWq0GnZQC16PPTmYFZdpp0Uh", 1112345678,mapOf("latitude" to -34.7086053, "longitude" to -58.2809884), "undefine","ExponentPushToken[0XZ0dzHNirdz-ogo3o64e1]")

        val pets = listOf(
            PetRequestDTO("Mía", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Mia.jpg?raw=true",
                null,"Gato", null, "Transito", "mates4ever@gmail.com", true,true, null,"Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Siria", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Siria.jpg?raw=true",
                null,"Gato", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Oreo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Oreo.jpg?raw=true",
                null,"Gato", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Venom", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Venom.jpg?raw=true",
                null,"Gato", null, "Adopción", "mates4ever@gmail.com",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Moscú", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Moscu.jpeg?raw=true",
                null,"Gato", null, "Adopción", "mates4ever@gmail.com",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Leia", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Leia.jpg?raw=true",
                null,"Gato", null, "Adopción", "mates4ever@gmail.com",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Batman", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Batman.jpg?raw=true",
                "11/11/2022","Gato", "", "Perdido", "mates4ever@gmail.com", true, true, "", "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.829613, "longitude" to -58.190460)),
            PetRequestDTO("Frappe", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Frappe.jpg?raw=true",
                null,"Gato", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.823431, "longitude" to -58.185739)),
            PetRequestDTO("Jabba", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Jabba.jpg?raw=true",
                null,"Gato", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.828486, "longitude" to -58.1856101)),
            PetRequestDTO("Nella", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Nella.jpg?raw=true",
                null,"Conejo", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Luna", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Luna.jpg?raw=true",
                null,"Conejo", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Donut", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Donut.jpg?raw=true",
                null,"Conejo", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Curry", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Curry.jpg?raw=true",
                null,"Conejo", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Groot", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Groot.jpg?raw=true",
                null,"Conejo", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Jar jar", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Jar.jpg?raw=true",
                null,"Conejo", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.704794, "longitude" to -58.276056)),
            PetRequestDTO("Odie", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Odie.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Slinky", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Slinky.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Pongo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Pongo.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Frank", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Frank.jpg?raw=true",
                null,"Perro", null, "Adopción", "mates4ever@gmail.com", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar", null),
            PetRequestDTO("Milo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Milo.jpg?raw=true",
                null,"Perro", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Bingo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Bingo.jpg?raw=true",
                null,"Perro", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Gala", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Gala.jpg?raw=true",
                null,"Perro", null, "Transito", "mates4ever@gmail.com", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo", null),
            PetRequestDTO("Kira", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Kira.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.702042, "longitude" to -58.280476)),
            PetRequestDTO("Linda", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Linda.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.699898, "longitude" to -58.281307)),
            PetRequestDTO("Nugget", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Nugget.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.697256,"longitude" to -58.280429)),
            PetRequestDTO("Flash", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Flash.jpg?raw=true",
                null,"Perro", null, "Perdido", "mates4ever@gmail.com", true, true, null, "Lo encontre en la puerta de mi casa", mapOf("latitude" to -34.703430, "longitude" to -58.282618)))

        userRepository.insert(user)
        pets.forEach { pet: PetRequestDTO -> petService.createPet(pet) }
    }
}
