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
        val pets = listOf(
            Pet("Mía", "https://github.com/aldiiicastro/mates4ever/blob/main/frontend/assets/Logo.png?raw=true", 5, null,"Gato", null, "Transito", "Octavio", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Siria", "frontend/assets/gatitos/Mia.jpg", 15, null,"Gato", null, "Transito", "Maite", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Oreo", "frontend/assets/gatitos/Mia.jpg", 2, null,"Gato", null, "Transito", "Ariana", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Venom", "frontend/assets/gatitos/Mia.jpg", 3, null,"Gato", null, "Adopción", "Agustín", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Moscú", "frontend/assets/gatitos/Mia.jpg", 6, null,"Gato", null, "Adopción", "Elías ", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Leia", "frontend/assets/gatitos/Mia.jpg", 8, null,"Gato", null, "Adopción", "A", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Batman", "chrome://global/skin/media/imagedoc-darknoise.png", 1, null,"Gato", null, "Perdido", "Ariadna", "Lo encontre en la puerta de mi casa"),
            Pet("Frappe", "frontend/assets/gatitos/Mia.jpg", 0, null,"Gato", null, "Perdido", "ULISES", "Lo encontre en la puerta de mi casa"),
            Pet("Jabba", "frontend/assets/gatitos/Mia.jpg", 9, null,"Gato", null, "Perdido", "Esteban ", "Lo encontre en la puerta de mi casa"),
            Pet("Nella", "frontend/assets/gatitos/Mia.jpg", 5, null,"Conejo", null, "Transito", "NORMA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Luna", "frontend/assets/gatitos/Mia.jpg", 6, null,"Conejo", null, "Transito", "a", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Donut", "frontend/assets/gatitos/Mia.jpg", 3, null,"Conejo", null, "Transito", "Mónica", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Curry", "frontend/assets/gatitos/Mia.jpg", 1, null,"Conejo", null, "Adopción", "Ornella", "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Groot", "frontend/assets/gatitos/Mia.jpg", 2, null,"Conejo", null, "Adopción", "Marisa", "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Jar jar", "frontend/assets/gatitos/Mia.jpg", 2, null,"Conejo", null, "Perdido", "Emilia ", "Lo encontre en la puerta de mi casa"),
            Pet("Odie", "frontend/assets/gatitos/Mia.jpg", 4, null,"Perro", null, "Adopción", "ÚRSULA", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Slinky", "frontend/assets/gatitos/Mia.jpg", 2, null,"Perro", null, "Adopción", "NADIA", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Pongo", "frontend/assets/gatitos/Mia.jpg", 1, null,"Perro", null, "Adopción", "Muriel", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Frank", "frontend/assets/gatitos/Mia.jpg", 5, null,"Perro", null, "Adopción", "Alan", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar"),
            Pet("Milo", "frontend/assets/gatitos/Mia.jpg", 7, null,"Perro", null, "Transito", "NOEMÍ", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Bingo", "frontend/assets/gatitos/Mia.jpg", 9, null,"Perro", null, "Transito", "a", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Gala", "frontend/assets/gatitos/Mia.jpg", 25, null,"Perro", null, "Transito", "CAMILA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo"),
            Pet("Kira", "frontend/assets/gatitos/Mia.jpg", 4, null,"Perro", null, "Perdido", "CARLOS", "Lo encontre en la puerta de mi casa"),
            Pet("Linda", "frontend/assets/gatitos/Mia.jpg", 8, null,"Perro", null, "Perdido", "Óliver", "Lo encontre en la puerta de mi casa"),
            Pet("Nugget", "frontend/assets/gatitos/Mia.jpg", 3, null,"Perro", null, "Perdido", "Mireya", "Lo encontre en la puerta de mi casa"),
            Pet("Flash", "frontend/assets/gatitos/Mia.jpg", 5, null,"Perro", null, "Perdido", "Aída", "Lo encontre en la puerta de mi casa"))
        pets.forEach { pet: Pet -> petRepository!!.insert(pet) }
    }
}
