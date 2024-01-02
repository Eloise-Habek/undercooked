package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.RecipeRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
	final RecipeRepository repo;

	private final IngredientService ingredientService;

	public RecipeService(RecipeRepository repo, IngredientService ingredientService) {
		this.repo = repo;
		this.ingredientService = ingredientService;
	}

	public Recipe createRecipe(Recipe recipe, Person author) {
		recipe.setAuthor(author);

		for (var ingredientWithAmount : recipe.getIngredients()) {
			ingredientService.fillInformation(ingredientWithAmount.getIngredient());
		}

		repo.save(recipe);
		return recipe;
	}

	public List<Recipe> findAll() {
		return repo.findAll();
	}

	public void deleteById(Long id) {
		repo.deleteById(id);
	}

	public Recipe findById(Long id) {
		return repo.findById(id).orElseThrow(() -> new EntityMissingException(Recipe.class, id));
	}

	public Recipe modifyExisting(Recipe existing, Recipe requestRecipe) {
		// ovo mora biti prije existing.setIngredients(), inače se sve krši sa TransientObjectException
		for (var ingredientWithAmount : requestRecipe.getIngredients()) {
			ingredientService.fillInformation(ingredientWithAmount.getIngredient());
		}
		existing.setName(requestRecipe.getName());
		existing.setPreparationTime(requestRecipe.getPreparationTime());
		existing.setDescription(requestRecipe.getDescription());
		existing.setPreparationDescription(requestRecipe.getPreparationDescription());
		existing.setIngredients(requestRecipe.getIngredients());
		repo.save(existing);
		return existing;
	}
}
