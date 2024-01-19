package hr.fer.progi.UndercookedDemo.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hr.fer.progi.UndercookedDemo.dto.IPersonMinimal;
import hr.fer.progi.UndercookedDemo.dto.IRecipeMinimal;
import jakarta.persistence.*;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "OneRecipeRatingPerPerson", columnNames = {StarRating.person_column, StarRating.recipe_column})})
public class StarRating {

	public static final String person_field_name = "person";
	public static final String recipe_field_name = "recipe";

	static final String person_column = "person_id";
	static final String recipe_column = "recipe_id";

	@Id
	@GeneratedValue
	private Long id;

	/**
	 * The person that gave the rating.
	 */
	@ManyToOne
	@JoinColumn(name = person_column)
	Person person;

	/**
	 * The recipe that was rated.
	 */
	@ManyToOne
	@JoinColumn(name = recipe_column)
	Recipe recipe;

	/**
	 * Rating, 1 to 5.
	 */
	double rating;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	@JsonSerialize(as = IPersonMinimal.class)
	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	@JsonSerialize(as = IRecipeMinimal.class)
	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		if (!(rating >= 1 && rating <= 5)) {
			throw new IllegalArgumentException("Invalid rating: " + rating + ". Must be in range 1-5.");
		}

		this.rating = rating;
	}
}
