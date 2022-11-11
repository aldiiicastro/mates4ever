package mate4ever.ttip.repository

import mate4ever.ttip.model.Pet
import mate4ever.ttip.model.User
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository

@Configuration
@Repository
interface PetRepository : MongoRepository<Pet?, String?> {
    fun findItemById(id: String): Pet?
    fun insert(pet: Pet): Pet
    fun findByUser(user: String) : MutableIterable<Pet>
    @Query(value = "{ '_id' : {'\$in' : ?0 } }", fields = "{ 'description': 0 }")
    fun findAllThin(ids: Iterable<String?>?): Iterable<Pet>?

    @Query(
        "{ 'coordinates' : { \$where: " +
                "coordinates " +
                "&& Math.abs(coordinates.latitude) - 34.8266321 <= 0.2 " +
                "&&  Math.abs(coordinates.longitude) - 58.187748 <= 0.2 }}",
    )
    fun getNearbyPets(lat : Double, long : Double) : MutableIterable<Pet>

    @Query(value = "'_coordinates' : { \$where: " +
            "_coordinates " +
            "&& Math.abs(_coordinates.latitude) - 34.8266321 <= 0.2 " +
            "&&  Math.abs(_coordinates.longitude) - 58.187748 <= 0.2 }")
    fun findByCoordinates(lat : Double, long : Double): MutableIterable<Pet>
//    override fun deleteAll()
}
