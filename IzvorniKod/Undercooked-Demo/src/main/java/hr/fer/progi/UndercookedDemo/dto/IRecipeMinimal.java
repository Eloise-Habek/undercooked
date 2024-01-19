package hr.fer.progi.UndercookedDemo.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hr.fer.progi.UndercookedDemo.domain.Person;

import java.time.Duration;

/**
 * A minimal recipe object that doesn't have nested entities to avoid infinite recursion during JSON serialisation.
 */
public interface IRecipeMinimal {

	Long getId();

	String getName();

	Duration getPreparationTime();

	String getDescription();

	String getPreparationDescription();

	@JsonSerialize(as = IPersonMinimal.class)
	Person getAuthor();

	Double getAverageRating();
}
