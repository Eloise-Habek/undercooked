package hr.fer.progi.UndercookedDemo.dto;

import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.StarRating;
import hr.fer.progi.UndercookedDemo.domain.WeekdayAvailability;

import java.util.Collection;
import java.util.List;

/**
 * Properties of a person object that are publicly visible, even to users that are not logged in.
 */
public interface IPersonPublic extends IPersonMinimal {

	List<Recipe> getRecipes();

	Collection<StarRating> getRatings();

	List<Recipe> getSavedRecipes();

	WeekdayAvailability getAvailability();
}
