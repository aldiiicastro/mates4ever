package mate4ever.ttip.modelTests

import mate4ever.ttip.model.Comment
import org.junit.jupiter.api.Test


class CommentTest {
    @Test
    fun createComment() {
        val comment = Comment(null, "29", null, null, "Un comentario", "aldana@gmail.com", null)
        assert(comment.petID == "29")
        assert(comment.image == null)
        assert(comment.dateOfSeen == null)
        assert(comment.commentary == "Un comentario")
        assert(comment.contact == "aldana@gmail.com")
        assert(comment.coordinates == null)
    }

    @Test
    fun createCommentWithNullPetID() {
        val comment = Comment(null, "", null, null, "Un comentario", "aldana@gmail.com", null)
        assert(comment.petID == "")
        assert(comment.image == null)
        assert(comment.dateOfSeen == null)
        assert(comment.commentary == "Un comentario")
        assert(comment.contact == "aldana@gmail.com")
        assert(comment.coordinates == null)
    }
}
