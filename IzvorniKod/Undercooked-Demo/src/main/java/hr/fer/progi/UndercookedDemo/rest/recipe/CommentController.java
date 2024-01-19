package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.domain.Comment;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.CommentService;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import hr.fer.progi.UndercookedDemo.service.RequestDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/recipes/{recipe_id}/comments")
public class CommentController {

	private final RecipeService recipeService;
	private final CommentService commentService;
	private final PersonService personService;

	public CommentController(RecipeService recipeService, CommentService commentService, PersonService personService) {
		this.recipeService = recipeService;
		this.commentService = commentService;
		this.personService = personService;
	}

	@GetMapping
	public List<Comment> getAll(@PathVariable("recipe_id") Long recipeId) {
		var recipe = recipeService.findById(recipeId);
		return commentService.getFromRecipe(recipe);
	}

	@GetMapping("/{comment_id}")
	public Comment get(@PathVariable("recipe_id") Long recipeId, @PathVariable("comment_id") Long commentId) {
		var recipe = recipeService.findById(recipeId);
		var comment = commentService.findById(commentId);

		if (!comment.getRecipe().equals(recipe))
			throw new RequestDeniedException("Comment not on this recipe");

		return commentService.findById(commentId);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Comment post(@PathVariable("recipe_id") Long recipeId, Principal principal, @RequestBody Comment comment) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);
		return commentService.addComment(recipe, person, comment);
	}

	@PutMapping("/{comment_id}")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Comment put(@PathVariable("recipe_id") Long recipeId, @PathVariable("comment_id") Long commentId, Principal principal, @RequestBody Comment requestComment) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);
		var existing = commentService.findById(commentId);

		if (!existing.getRecipe().equals(recipe))
			throw new RequestDeniedException("Comment not on this recipe");

		if (!authorisedToModify(existing, person))
			throw new RequestDeniedException("Tried to modify another person's comment.");

		return commentService.modifyExisting(existing, requestComment);
	}

	@DeleteMapping("/{comment_id}")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public void delete(@PathVariable("recipe_id") Long recipeId, @PathVariable("comment_id") Long commentId, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);
		var comment = commentService.findById(commentId);

		if (!comment.getRecipe().equals(recipe))
			throw new RequestDeniedException("Comment not on this recipe");

		if (!authorisedToModify(comment, person))
			throw new RequestDeniedException("Tried to delete another person's comment.");

		var existing = commentService.findById(commentId);
		commentService.delete(existing);
	}

	private boolean authorisedToModify(Comment existing, Person person) {
		if (person.getAdmin())
			return true;

		return existing.getAuthor().equals(person);
	}
}
