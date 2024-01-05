package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import hr.fer.progi.UndercookedDemo.service.RequestDeniedException;
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

	/**
	 * Checks whether the person is authorised to modify the existing recipe.
	 *
	 * @param existing The existing recipe to check against.
	 * @param person   The person that is trying to make changes to the existing recipe.
	 * @return true if the person is authorised to modify the recipe, false otherwise.
	 */
	public static boolean authorisedToModify(Recipe existing, Person person) {
		if (person.getAdmin())
			return true;

		return existing.getAuthor().equals(person);
	}
}
