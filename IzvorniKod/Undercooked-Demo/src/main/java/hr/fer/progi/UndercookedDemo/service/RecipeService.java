package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.RecipeRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class RecipeService {
	final RecipeRepository repo;

	private final IngredientService ingredientService;

	public RecipeService(RecipeRepository repo, IngredientService ingredientService, PersonService personService) {
		this.repo = repo;
		this.ingredientService = ingredientService;

		seedData(personService);
	}

	public Recipe createRecipe(Recipe recipe, Person author) {
		recipe.setRatings(Collections.emptyList());
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

	private void seedData(PersonService personService) {
		var pero = personService.findByUsername("pero").get();
		var recipe = new Recipe();
		recipe.setName("Kruh");
		recipe.setPreparationTime(Duration.ofMinutes(40));
		recipe.setDescription("slatki kruh");
		recipe.setPreparationDescription("1. stavi sastojke\n2. ???\n3. Profit");
		recipe.setIngredients(new ArrayList<>());
		createRecipe(recipe, pero);
	}
}
