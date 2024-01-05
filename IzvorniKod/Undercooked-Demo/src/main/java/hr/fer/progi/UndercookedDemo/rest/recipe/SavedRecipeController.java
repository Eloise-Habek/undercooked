package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import hr.fer.progi.UndercookedDemo.service.SavedRecipeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("recipes/{id}/saved")
public class SavedRecipeController {
	private final PersonService personService;
	private final RecipeService recipeService;
	private final SavedRecipeService savedRecipeService;

	public SavedRecipeController(PersonService personService, RecipeService recipeService, SavedRecipeService savedRecipeService) {
		this.personService = personService;
		this.recipeService = recipeService;
		this.savedRecipeService = savedRecipeService;
	}

	@GetMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public boolean getSaved(@PathVariable("id") Long recipeId, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		return savedRecipeService.isSavedFor(person, recipe);
	}

	@PutMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public boolean putSaved(@PathVariable("id") Long recipeId, Principal principal, @RequestBody boolean save) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		return save ? savedRecipeService.saveRecipe(person, recipe) : savedRecipeService.removeSavedRecipe(person, recipe);
	}

}
