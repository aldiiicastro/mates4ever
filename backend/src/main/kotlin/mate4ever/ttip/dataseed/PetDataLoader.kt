package mate4ever.ttip.dataseed

import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User
import mate4ever.ttip.repository.PetRepository
import mate4ever.ttip.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class PetDataLoader : CommandLineRunner {
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
        petRepository.deleteAll()

        val user = User(
            null,
            "Mates4Ever",
            "Org",
            "mates4ever@gmail.com",
            "Ejemplo12",
            1112345678,
            "Bernal",
            "Buenos Aires",
            "",
            listOf()
        )
        val pets = listOf(
            Pet(
                "Mía",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Mia.jpg?raw=true",
                null,
                "Gato",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Siria",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Siria.jpg?raw=true",
                null,
                "Gato",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Oreo",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Oreo.jpg?raw=true",
                null,
                "Gato",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Venom",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Venom.jpg?raw=true",
                null,
                "Gato",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Moscú",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Moscu.jpeg?raw=true",
                null,
                "Gato",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Leia",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Leia.jpg?raw=true",
                null,
                "Gato",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Batman",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Batman.jpg?raw=true",
                null,
                "Gato",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Frappe",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Frappe.jpg?raw=true",
                null,
                "Gato",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Jabba",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Jabba.jpg?raw=true",
                null,
                "Gato",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Nella",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Nella.jpg?raw=true",
                null,
                "Conejo",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Luna",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Luna.jpg?raw=true",
                null,
                "Conejo",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Donut",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Donut.jpg?raw=true",
                null,
                "Conejo",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Curry",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Curry.jpg?raw=true",
                null,
                "Conejo",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Groot",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Groot.jpg?raw=true",
                null,
                "Conejo",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Jar jar",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Jar.jpg?raw=true",
                null,
                "Conejo",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Odie",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Odie.jpg?raw=true",
                null,
                "Perro",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Slinky",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Slinky.jpg?raw=true",
                null,
                "Perro",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Pongo",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Pongo.jpg?raw=true",
                null,
                "Perro",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Frank",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Frank.jpg?raw=true",
                null,
                "Perro",
                null,
                "Adopción",
                user,
                true,
                true,
                null,
                "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"
            ),
            Pet(
                "Milo",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Milo.jpg?raw=true",
                null,
                "Perro",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Bingo",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Bingo.jpg?raw=true",
                null,
                "Perro",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Gala",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Gala.jpg?raw=true",
                null,
                "Perro",
                null,
                "Transito",
                user,
                true,
                true,
                null,
                "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"
            ),
            Pet(
                "Kira",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Kira.jpg?raw=true",
                null,
                "Perro",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Linda",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Linda.jpg?raw=true",
                null,
                "Perro",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Nugget",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Nugget.jpg?raw=true",
                null,
                "Perro",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            ),
            Pet(
                "Flash",
                "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Flash.jpg?raw=true",
                null,
                "Perro",
                null,
                "Perdido",
                user,
                true,
                true,
                null,
                "Lo encontre en la puerta de mi casa"
            )
        )

        userRepository.insert(user)
        pets.forEach { pet: Pet -> petRepository.insert(pet) }
    }
}
