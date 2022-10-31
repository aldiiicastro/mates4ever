package mate4ever.ttip

import AESEncryptorGCM
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TtipApplication

fun main(args: Array<String>) {
	val secretKey: String =
		"662ede816988e58fb6d057d9d85605e0"

	var encryptor = AESEncryptorGCM()

	val encryptedValue: String? =encryptor.encrypt("2534Aldi", secretKey)
	println(encryptedValue)

	val decryptedValue: String? =encryptor.decryptWithAES(secretKey, "qriRBfSToWq0GnZQC16PPTmYFZdpp0Uh")
	println(decryptedValue)
	runApplication<TtipApplication>(*args)
}
