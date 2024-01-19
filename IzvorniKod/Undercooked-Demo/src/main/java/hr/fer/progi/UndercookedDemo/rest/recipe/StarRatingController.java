package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.domain.StarRating;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import hr.fer.progi.UndercookedDemo.service.StarRatingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/recipes/{id}/rating")
public class StarRatingController {

	private final PersonService personService;
	private final RecipeService recipeService;
	private final StarRatingService ratingService;

	public StarRatingController(PersonService personService, RecipeService recipeService, StarRatingService ratingService) {
		this.personService = personService;
		this.recipeService = recipeService;
		this.ratingService = ratingService;
	}

	@PutMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public StarRating putRating(@PathVariable("id") Long recipeId, Principal principal, @RequestBody StarRating rating) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		rating.setPerson(person);
		rating.setRecipe(recipe);

		return ratingService.addOrUpdateRating(rating);
	}

	@DeleteMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public void deleteRating(@PathVariable("id") Long recipeId, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		var rating = ratingService.getRating(person, recipe);
		ratingService.removeRating(rating);
	}

}
