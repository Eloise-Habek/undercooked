package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

	private final PersonService personService;
	private final RecipeService recipeService;

	public RecipeController(PersonService personService, RecipeService recipeService) {
		this.personService = personService;
		this.recipeService = recipeService;
	}

	@GetMapping
	public List<Recipe> getAll() {
		return recipeService.findAll();
	}

	@GetMapping("/{id}")
	public Recipe get(@PathVariable("id") Long id) {
		return recipeService.findById(id);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Recipe post(@RequestBody Recipe recipe, Principal principal) {
		return recipeService.createRecipe(recipe, personService.fromPrincipal(principal));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
	public void delete(@PathVariable("id") Long id) {
		recipeService.deleteById(id);
	}
}
