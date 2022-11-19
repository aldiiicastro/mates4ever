package mate4ever.ttip.controller

import mate4ever.ttip.dto.CommentRequestDTO
import mate4ever.ttip.model.Comment
import mate4ever.ttip.model.Pet
import mate4ever.ttip.service.CommentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@RestController
@EnableAutoConfiguration
class CommentController {
    @Autowired
    private lateinit var commentService : CommentService

    @PostMapping("/api/comment/create")
    fun createComment(@RequestBody commentRequestDTO: CommentRequestDTO): ResponseEntity<*> {
        val commentSaved = commentService.createComment(commentRequestDTO)
        return ResponseEntity(commentSaved, null, HttpStatus.OK)
    }

    @GetMapping("/api/comment/{petID}")
    fun getCommentByPetID(@PathVariable(required = true) petID: String): ResponseEntity<*> {
        val commentsSaved = commentService.findCommentByPetID(petID)
        return ResponseEntity(commentsSaved, null, HttpStatus.OK)
    }
}
