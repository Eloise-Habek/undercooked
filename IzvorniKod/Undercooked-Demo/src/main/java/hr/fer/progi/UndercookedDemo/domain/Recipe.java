package hr.fer.progi.UndercookedDemo.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hr.fer.progi.UndercookedDemo.dto.IPersonMinimal;
import hr.fer.progi.UndercookedDemo.dto.IRecipeMinimal;
import jakarta.persistence.*;

import java.time.Duration;
import java.util.Collection;
import java.util.List;

@Entity
public class Recipe implements IRecipeMinimal {

	public static final String author_field_name = "author";

	@Id
	@GeneratedValue
	private Long id;

	private String name;

	private Duration preparationTime;

	private String description;

	private String preparationDescription;

	@ManyToOne
	private Person author;

	@ElementCollection
	@OrderColumn
	private List<IngredientWithAmount> ingredients;

	@OneToMany(mappedBy = StarRating.recipe_field_name)
	private Collection<StarRating> ratings;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Duration getPreparationTime() {
		return preparationTime;
	}

	public void setPreparationTime(Duration preparationTime) {
		this.preparationTime = preparationTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPreparationDescription() {
		return preparationDescription;
	}

	public void setPreparationDescription(String preparationDescription) {
		this.preparationDescription = preparationDescription;
	}

	@JsonSerialize(as = IPersonMinimal.class)
	public Person getAuthor() {
		return author;
	}

	public void setAuthor(Person author) {
		this.author = author;
	}

	public List<IngredientWithAmount> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<IngredientWithAmount> ingredients) {
		this.ingredients = ingredients;
	}

	public void setRatings(Collection<StarRating> ratings) {
		this.ratings = ratings;
	}

	public Collection<StarRating> getRatings() {
		return ratings;
	}

	public Double getAverageRating() {
		var average = ratings.stream().mapToDouble(StarRating::getRating).average();
		return average.isPresent() ? average.getAsDouble() : null;
	}
}
