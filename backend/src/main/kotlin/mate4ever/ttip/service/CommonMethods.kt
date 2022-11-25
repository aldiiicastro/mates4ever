package mate4ever.ttip.service

import java.time.LocalDate
import java.time.format.DateTimeFormatter

class CommonMethods {
     fun parseLocalDate(date: String?): LocalDate? {
        return if (date != null) {
            val formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
            LocalDate.parse(date, formatter)
        } else {
            null
        }
    }

    fun nearbyQuery(km:Double, lat: Double, long: Double): String {
        return " { \$where: 'this.coordinates && Math.abs(this.coordinates.latitude - $lat) <= $km &&  Math.abs(this.coordinates.longitude - $long) <= $km' }"
    }
}
