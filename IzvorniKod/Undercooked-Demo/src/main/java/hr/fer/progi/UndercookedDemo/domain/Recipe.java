package hr.fer.progi.UndercookedDemo.domain;

import hr.fer.progi.UndercookedDemo.dto.PersonMinimalDto;
import jakarta.persistence.*;

import java.time.Duration;
import java.util.List;

@Entity
public class Recipe {

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

	public PersonMinimalDto getAuthor() {
		return new PersonMinimalDto(author);
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
}
