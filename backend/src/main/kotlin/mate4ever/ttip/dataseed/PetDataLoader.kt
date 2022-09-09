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
        val pet1 = Pet("Mía", "image", 5, null,"Gato", null, "En transito", "Octavio", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet2 = Pet("Siria", "image", 15, null,"Gato", null, "En transito", "Maite", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet3 = Pet("Oreo", "image", 2, null,"Gato", null, "En transito", "Ariana", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet4 = Pet("Venom", "image", 3, null,"Gato", null, "En adopción", "Agustín", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet5 = Pet("Moscú", "image", 6, null,"Gato", null, "En adopción", "Elías ", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet6 = Pet("Leia", "image", 8, null,"Gato", null, "En adopción", "VALERIO", "Mi gatita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet7 = Pet("Batman", "image", 1, null,"Gato", null, "Perdido", "Ariadna", "Lo encontre en la puerta de mi casa")
        val pet8 = Pet("Frappe", "image", 0, null,"Gato", null, "Perdido", "ULISES", "Lo encontre en la puerta de mi casa")
        val pet9 = Pet("Jabba", "image", 9, null,"Gato", null, "Perdido", "Esteban ", "Lo encontre en la puerta de mi casa")
        val pet10 = Pet("Nella", "image", 5, null,"Conejo", null, "En transito", "NORMA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet11 = Pet("Luna", "image", 6, null,"Conejo", null, "En transito", "VALENTÍN", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet12 = Pet("Donut", "image", 3, null,"Conejo", null, "En transito", "Mónica", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet13 = Pet("Curry", "image", 1, null,"Conejo", null, "En adopción", "Ornella", "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet14 = Pet("Groot", "image", 2, null,"Conejo", null, "En adopción", "Marisa", "Mi conejo los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet15 = Pet("Jar jar", "image", 2, null,"Conejo", null, "Perdido", "Emilia ", "Lo encontre en la puerta de mi casa")
        val pet16 = Pet("Odie", "image", 4, null,"Perro", null, "En adopción", "ÚRSULA", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet17 = Pet("Slinky", "image", 2, null,"Perro", null, "En adopción", "NADIA", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet18 = Pet("Pongo", "image", 1, null,"Perro", null, "En adopción", "Muriel", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet19 = Pet("Frank", "image", 5, null,"Perro", null, "En adopción", "Alan", "Mi perrita los tuvo hace poco y buscamos a alguien que les den un buen hogar")
        val pet20 = Pet("Milo", "image", 7, null,"Perro", null, "En transito", "NOEMÍ", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet21 = Pet("Bingo", "image", 9, null,"Perro", null, "En transito", "VALENTINA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet22 = Pet("Gala", "image", 25, null,"Perro", null, "En transito", "CAMILA", "Tenemos muchos animales y necesitamos que alguien pueda transitarlo o adoptarlo")
        val pet23 = Pet("Kira", "image", 4, null,"Perro", null, "Perdido", "CARLOS", "Lo encontre en la puerta de mi casa")
        val pet24 = Pet("Linda", "image", 8, null,"Perro", null, "Perdido", "Óliver", "Lo encontre en la puerta de mi casa")
        val pet25 = Pet("Nugget", "image", 3, null,"Perro", null, "Perdido", "Mireya", "Lo encontre en la puerta de mi casa")
        val pet26 = Pet("Flash", "image", 5, null,"Perro", null, "Perdido", "Aída", "Lo encontre en la puerta de mi casa")
        petRepository!!.insert(pet1)
        petRepository!!.insert(pet2)
        petRepository!!.insert(pet3)
        petRepository!!.insert(pet4)
        petRepository!!.insert(pet5)
        petRepository!!.insert(pet6)
        petRepository!!.insert(pet7)
        petRepository!!.insert(pet8)
        petRepository!!.insert(pet9)
        petRepository!!.insert(pet10)
        petRepository!!.insert(pet11)
        petRepository!!.insert(pet12)
        petRepository!!.insert(pet13)
        petRepository!!.insert(pet14)
        petRepository!!.insert(pet15)
        petRepository!!.insert(pet16)
        petRepository!!.insert(pet17)
        petRepository!!.insert(pet18)
        petRepository!!.insert(pet19)
        petRepository!!.insert(pet20)
        petRepository!!.insert(pet21)
        petRepository!!.insert(pet22)
        petRepository!!.insert(pet23)
        petRepository!!.insert(pet24)
        petRepository!!.insert(pet25)
        petRepository!!.insert(pet26)
    }

}
