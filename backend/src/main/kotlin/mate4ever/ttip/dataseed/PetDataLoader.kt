package mate4ever.ttip.dataseed

import mate4ever.ttip.model.Pet
import mate4ever.ttip.repository.PetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class PetDataLoader: CommandLineRunner {
    @Autowired
    private lateinit var petRepository: PetRepository

    @Throws(Exception::class)
    override fun run(vararg args: String?) {
        loadPetData()
    }
    fun loadPetData() {
        petRepository.deleteAll()
        val pets = listOf(
            Pet("Mía", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Mia.jpg?raw=true",
                null,"Gato", null, "Transito", "Octavio", true,true, null,"Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Siria", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Siria.jpg?raw=true",
                null,"Gato", null, "Transito", "Maite", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Oreo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Oreo.jpg?raw=true",
                null,"Gato", null, "Transito", "Ariana", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Venom", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Venom.jpg?raw=true",
                null,"Gato", null, "Adopción", "Agustín",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Moscú", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Moscu.jpeg?raw=true",
                null,"Gato", null, "Adopción", "Elías ",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Leia", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Leia.jpg?raw=true",
                null,"Gato", null, "Adopción", "A",  true, true, null, "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Batman", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Batman.jpg?raw=true",
                null,"Gato", null, "Perdido", "Ariadna", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Frappe", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Frappe.jpg?raw=true",
                null,"Gato", null, "Perdido", "ULISES", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Jabba", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Jabba.jpg?raw=true",
                null,"Gato", null, "Perdido", "Esteban ", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Nella", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Nella.jpg?raw=true",
                null,"Conejo", null, "Transito", "NORMA", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Luna", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Luna.jpg?raw=true",
                null,"Conejo", null, "Transito", "a", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Donut", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Donut.jpg?raw=true",
                null,"Conejo", null, "Transito", "Mónica", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Curry", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Curry.jpg?raw=true",
                null,"Conejo", null, "Adopción", "Ornella", true, true, null, "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Groot", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Groot.jpg?raw=true",
                null,"Conejo", null, "Adopción", "Marisa", true, true, null, "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Jar jar", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Jar.jpg?raw=true",
                null,"Conejo", null, "Perdido", "Emilia ", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Odie", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Odie.jpg?raw=true",
                null,"Perro", null, "Adopción", "ÚRSULA", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Slinky", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Slinky.jpg?raw=true",
                null,"Perro", null, "Adopción", "NADIA", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Pongo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Pongo.jpg?raw=true",
                null,"Perro", null, "Adopción", "Muriel", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Frank", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Frank.jpg?raw=true",
                null,"Perro", null, "Adopción", "Alan", true, true, null, "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Milo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Milo.jpg?raw=true",
                null,"Perro", null, "Transito", "NOEMÍ", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Bingo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Bingo.jpg?raw=true",
                null,"Perro", null, "Transito", "a", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Gala", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Gala.jpg?raw=true",
                null,"Perro", null, "Transito", "CAMILA", true, true, null, "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Kira", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Kira.jpg?raw=true",
                null,"Perro", null, "Perdido", "CARLOS", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Linda", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Linda.jpg?raw=true",
                null,"Perro", null, "Perdido", "Óliver", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Nugget", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Nugget.jpg?raw=true",
                null,"Perro", null, "Perdido", "Mireya", true, true, null, "Lo encontre en la puerta de mi casa"),
            Pet("Flash", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Flash.jpg?raw=true",
                null,"Perro", null, "Perdido", "Aída", true, true, null, "Lo encontre en la puerta de mi casa"))
        pets.forEach { pet: Pet -> petRepository.insert(pet) }
    }
}
