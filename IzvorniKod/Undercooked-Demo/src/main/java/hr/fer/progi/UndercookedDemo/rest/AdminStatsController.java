package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.Optional;

@RestController
@RequestMapping("/admin/stats")
@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
public class AdminStatsController {
	private final RecipeService recipeService;
	private final PersonService personService;

	public AdminStatsController(RecipeService recipeService, PersonService personService) {
		this.recipeService = recipeService;
		this.personService = personService;
	}

	@GetMapping("/bestRatedRecipe")
	public Optional<Recipe> getBestRatedRecipe() {
		return recipeService.findAll().stream().filter(r -> r.getAverageRating() != null).max(Comparator.comparingDouble(Recipe::getAverageRating));
	}

	@GetMapping("/mostSavedRecipe")
	public Optional<Recipe> getMostSavedRecipe() {
		return recipeService.findAll().stream().max(Comparator.comparingInt(r -> r.getSavedBy().size()));
	}

	@GetMapping("/mostActiveUser")
	public Optional<Person> getMostActiveUser() {
		return personService.listAll().stream().max(Comparator.comparingInt(p -> p.getRecipes().size()));
	}
}
