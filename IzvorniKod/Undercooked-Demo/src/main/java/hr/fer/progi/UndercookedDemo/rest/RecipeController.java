package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.StarRating;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import hr.fer.progi.UndercookedDemo.service.RequestDeniedException;
import hr.fer.progi.UndercookedDemo.service.StarRatingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

	private final PersonService personService;
	private final RecipeService recipeService;
	private final StarRatingService ratingService;

	public RecipeController(PersonService personService, RecipeService recipeService, StarRatingService ratingService) {
		this.personService = personService;
		this.recipeService = recipeService;
		this.ratingService = ratingService;
	}

	@GetMapping
	public List<Recipe> getAll() {
		return recipeService.findAll();
	}

	@GetMapping("/{id}")
	public Recipe get(@PathVariable("id") Long id) {
		return recipeService.findById(id);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Recipe put(@PathVariable("id") Long id, @RequestBody Recipe requestRecipe, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var existing = recipeService.findById(id);
		if (!authorisedToModify(existing, person)) {
			throw new RequestDeniedException("Tried to update another person's recipe.");
		}

		return recipeService.modifyExisting(existing, requestRecipe);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Recipe post(@RequestBody Recipe recipe, Principal principal) {
		return recipeService.createRecipe(recipe, personService.fromPrincipal(principal));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public void delete(@PathVariable("id") Long id, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var existing = recipeService.findById(id);

		if (!authorisedToModify(existing, person))
			throw new RequestDeniedException("Tried to delete another person's recipe.");

		recipeService.deleteById(id);
	}

	@PutMapping("/{id}/rating")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public StarRating putRating(@PathVariable("id") Long recipeId, Principal principal, @RequestBody StarRating rating) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		rating.setPerson(person);
		rating.setRecipe(recipe);

		return ratingService.addOrUpdateRating(rating);
	}

	@DeleteMapping("/{id}/rating")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public void deleteRating(@PathVariable("id") Long recipeId, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		var rating = ratingService.getRating(person, recipe);
		ratingService.removeRating(rating);
	}

	/**
	 * Checks whether the person is authorised to modify the existing recipe.
	 *
	 * @param existing The existing recipe to check against.
	 * @param person   The person that is trying to make changes to the existing recipe.
	 * @return true if the person is authorised to modify the recipe, false otherwise.
	 */
	private boolean authorisedToModify(Recipe existing, Person person) {
		if (person.getAdmin())
			return true;

		return existing.getAuthor().getId().equals(person.getId());
	}
}
