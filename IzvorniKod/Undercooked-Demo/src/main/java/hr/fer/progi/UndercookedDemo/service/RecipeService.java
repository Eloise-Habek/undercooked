package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.RecipeRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.RecipeCategory;
import hr.fer.progi.UndercookedDemo.domain.RecipeTag;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
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
		recipe.setRatings(Collections.emptyList());
		recipe.setComments(Collections.emptyList());

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
		var existing = repo.findById(id).orElseThrow(() -> new EntityMissingException(Recipe.class, id));

		for (var p : existing.getSavedBy()) {
			p.getSavedRecipes().remove(existing);
		}

		repo.delete(existing);
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
		existing.setCategory(requestRecipe.getCategory());
		existing.setTags(requestRecipe.getTags());
		existing.setYoutubeEmbedId(requestRecipe.getYoutubeEmbedId());
		repo.save(existing);
		return existing;
	}

	private void seedData(PersonService personService) {
		var pero = personService.findByUsername("pero");
		var recipe = new Recipe();
		recipe.setName("Kruh");
		recipe.setPreparationTime(Duration.ofMinutes(40));
		recipe.setDescription("slatki kruh");
		recipe.setPreparationDescription("1. stavi sastojke\n2. ???\n3. Profit");
		recipe.setIngredients(new ArrayList<>());
		recipe.setCategory(RecipeCategory.GlavnoJelo);
		recipe.setTags(new HashSet<>(List.of(RecipeTag.Vegetarijansko, RecipeTag.Vegansko, RecipeTag.BezGlutena)));
		recipe.setYoutubeEmbedId("B7UmUX68KtE");
		createRecipe(recipe, pero);
	}
}
