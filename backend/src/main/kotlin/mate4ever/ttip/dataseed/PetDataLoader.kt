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
            Pet("Mía", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Mia.jpg?raw=true", 5, null,"Gato", null, "Transito", "Octavio", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Siria", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Siria.jpg?raw=true", 15, null,"Gato", null, "Transito", "Maite", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Oreo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Oreo.jpg?raw=true", 2, null,"Gato", null, "Transito", "Ariana", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Venom", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Venom.jpg?raw=true", 3, null,"Gato", null, "Adopción", "Agustín", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Moscú", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Moscu.jpeg?raw=true", 6, null,"Gato", null, "Adopción", "Elías ", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Leia", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Leia.jpg?raw=true", 8, null,"Gato", null, "Adopción", "A", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Batman", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Batman.jpg?raw=true", 1, null,"Gato", null, "Perdido", "Ariadna", "Lo encontre en la puerta de mi casa"),
            Pet("Frappe", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Frappe.jpg?raw=true", 0, null,"Gato", null, "Perdido", "ULISES", "Lo encontre en la puerta de mi casa"),
            Pet("Jabba", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/gatitos/Jabba.jpg?raw=true", 9, null,"Gato", null, "Perdido", "Esteban ", "Lo encontre en la puerta de mi casa"),
            Pet("Nella", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Nella.jpg?raw=true", 5, null,"Conejo", null, "Transito", "NORMA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Luna", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Luna.jpg?raw=true", 6, null,"Conejo", null, "Transito", "a", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Donut", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Donut.jpg?raw=true", 3, null,"Conejo", null, "Transito", "Mónica", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Curry", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Curry.jpg?raw=true", 1, null,"Conejo", null, "Adopción", "Ornella", "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Groot", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Groot.jpg?raw=true", 2, null,"Conejo", null, "Adopción", "Marisa", "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Jar jar", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/conejitos/Jar.jpg?raw=true", 2, null,"Conejo", null, "Perdido", "Emilia ", "Lo encontre en la puerta de mi casa"),
            Pet("Odie", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Odie.jpg?raw=true", 4, null,"Perro", null, "Adopción", "ÚRSULA", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Slinky", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Slinky.jpg?raw=true", 2, null,"Perro", null, "Adopción", "NADIA", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Pongo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Pongo.jpg?raw=true", 1, null,"Perro", null, "Adopción", "Muriel", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Frank", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Frank.jpg?raw=true", 5, null,"Perro", null, "Adopción", "Alan", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Milo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Milo.jpg?raw=true", 7, null,"Perro", null, "Transito", "NOEMÍ", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Bingo", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Bingo.jpg?raw=true", 9, null,"Perro", null, "Transito", "a", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Gala", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Gala.jpg?raw=true", 25, null,"Perro", null, "Transito", "CAMILA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Kira", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Kira.jpg?raw=true", 4, null,"Perro", null, "Perdido", "CARLOS", "Lo encontre en la puerta de mi casa"),
            Pet("Linda", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Linda.jpg?raw=true", 8, null,"Perro", null, "Perdido", "Óliver", "Lo encontre en la puerta de mi casa"),
            Pet("Nugget", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Nugget.jpg?raw=true", 3, null,"Perro", null, "Perdido", "Mireya", "Lo encontre en la puerta de mi casa"),
            Pet("Flash", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/perritos/Flash.jpg?raw=true", 5, null,"Perro", null, "Perdido", "Aída", "Lo encontre en la puerta de mi casa"))
        pets.forEach { pet: Pet -> petRepository.insert(pet) }
    }
}
