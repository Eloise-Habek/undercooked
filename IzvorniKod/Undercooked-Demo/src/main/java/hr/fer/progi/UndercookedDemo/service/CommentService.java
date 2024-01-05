package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.CommentRepository;
import hr.fer.progi.UndercookedDemo.domain.Comment;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {

	private final CommentRepository repo;

	public CommentService(CommentRepository repo) {
		this.repo = repo;
	}

	public Comment findById(Long id) {
		return repo.findById(id).orElseThrow(() -> new EntityMissingException(Comment.class, id));
	}

	public List<Comment> getFromRecipe(Recipe recipe) {
		var comments = recipe.getComments();
		Assert.isTrue(isSorted(comments), "List from database was not sorted.");
		return comments;
	}

	public Comment addComment(Recipe recipe, Person author, Comment comment) {
		Assert.isNull(comment.getId(), "New comment with ID set.");
		Assert.notNull(comment.getText(), "Null text in comment.");
		comment.setAuthor(author);
		comment.setRecipe(recipe);
		comment.setPostedAt(Date.from(Instant.now()));
		repo.save(comment);
		return comment;
	}

	public Comment modifyExisting(Comment existing, Comment requestComment) {
		existing.setText(requestComment.getText()); // only the text can be updated.
		repo.save(existing);
		return existing;
	}

	public void delete(Comment comment) {
		repo.delete(comment);
	}

	private <T extends Comparable<T>> boolean isSorted(List<T> list) {
		for (int i = 0; i < list.size() - 1; i++) {
			if (list.get(i).compareTo(list.get(i + 1)) > 0) {
				return false;
			}
		}
		return true;
	}
}
