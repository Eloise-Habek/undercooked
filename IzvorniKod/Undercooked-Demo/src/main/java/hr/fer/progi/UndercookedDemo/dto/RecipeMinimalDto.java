package hr.fer.progi.UndercookedDemo.dto;

import hr.fer.progi.UndercookedDemo.domain.Recipe;

import java.time.Duration;

public record RecipeMinimalDto(Long id, String name, Duration preparationTime, String description, String preparationDescription, PersonMinimalDto author, Double averageRating) {
	public RecipeMinimalDto(Recipe recipe) {
		this(recipe.getId(), recipe.getName(), recipe.getPreparationTime(), recipe.getDescription(), recipe.getPreparationDescription(), recipe.getAuthor(), recipe.getAverageRating());
	}
}
