package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.RecipeRepository;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.RecipeCategory;
import hr.fer.progi.UndercookedDemo.domain.RecipeCuisine;
import hr.fer.progi.UndercookedDemo.domain.RecipeTag;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SearchService {

	private final RecipeRepository recipeRepository;

	public SearchService(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}

	public List<Recipe> findAll(RecipeCategory category, Set<RecipeTag> tags, RecipeCuisine cuisine) {
		var probe = new Recipe();
		if (category != null) probe.setCategory(category);
		if (cuisine != null) probe.setCuisine(cuisine);
		var example = Example.of(probe);

		var list = recipeRepository.findAll(example);

		if (tags == null || tags.isEmpty()) {
			return list;
		}

		return list.stream().filter(r -> r.getTags().containsAll(tags)).toList();
	}

	public List<Recipe> searchByKeywords(String[] keywords, RecipeCategory category, Set<RecipeTag> tags, RecipeCuisine cuisine) {
		// filter out the bad ones, and give rankings to the good ones
		Map<Recipe, MatchWeightCalculator> recipes = new HashMap<>();

		for (var recipe : findAll(category, tags, cuisine)) {
			recipes.put(recipe, new MatchWeightCalculator());
		}

		var locale = new Locale("hr", "HR");
		for (int i = 0; i < keywords.length; i++) {
			keywords[i] = keywords[i].toLowerCase(locale);
		}

		for (var e : recipes.entrySet()) {
			var r = e.getKey();
			var c = e.getValue();

			var name = r.getName().toLowerCase();
			var description = r.getDescription().toLowerCase();
			var ingredients = r.getIngredients().stream().map(i -> i.getIngredient().getName().toLowerCase()).toList();
			var stringifiedIngredients = String.join(" ", ingredients);

			for (var keyword : keywords) {
				if (name.contains(keyword)) c.increaseNameMatches();

				if (description.contains(keyword)) c.increaseDescriptionMatches();

				if (stringifiedIngredients.contains(keyword)) c.increaseIngredientMatches();
			}
		}

		for (var calc : recipes.values()) {
			calc.calculateSimilarity();
		}

		return recipes.entrySet().stream().filter(e -> e.getValue().getSimilarity() > 0).sorted((l, r) -> Double.compare(r.getValue().getSimilarity(), l.getValue().getSimilarity())) // inverse sort so the first entries have the highest match similarity.
				.map(Map.Entry::getKey).toList();
	}

	public static class MatchWeightCalculator {
		private static final double name_weight = 4;
		private static final double description_weight = 1;
		private static final double ingredient_weight = 2;

		private int nameMatches = 0;
		private int descriptionMatches = 0;
		private int ingredientMatches = 0;

		public void increaseNameMatches() {
			nameMatches++;
		}

		public void increaseDescriptionMatches() {
			descriptionMatches++;
		}

		public void increaseIngredientMatches() {
			ingredientMatches++;
		}

		public static double pow(double d) {
			return 2 - Math.pow(2, 1 - d);
		}

		public void calculateSimilarity() {
			similarity = pow(nameMatches) * name_weight + pow(descriptionMatches) * description_weight + pow(ingredientMatches) * ingredient_weight;
		}

		private double similarity;

		public double getSimilarity() {
			return similarity;
		}
	}
}
