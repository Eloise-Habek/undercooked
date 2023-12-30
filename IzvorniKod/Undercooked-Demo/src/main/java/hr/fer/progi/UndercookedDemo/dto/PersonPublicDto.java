package hr.fer.progi.UndercookedDemo.dto;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;

import java.util.List;

public record PersonPublicDto(Long id, String username, String name, String surname, boolean isAdmin, List<Recipe> recipes) {
	public PersonPublicDto(Person person) {
		this(person.getId(), person.getUsername(), person.getName(), person.getSurname(), person.getAdmin(), person.getRecipes());
	}
}
