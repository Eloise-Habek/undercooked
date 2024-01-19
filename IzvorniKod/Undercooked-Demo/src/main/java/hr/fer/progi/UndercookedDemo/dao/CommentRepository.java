package hr.fer.progi.UndercookedDemo.dao;

import hr.fer.progi.UndercookedDemo.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
