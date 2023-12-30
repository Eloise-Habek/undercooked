package hr.fer.progi.UndercookedDemo.dto;

import hr.fer.progi.UndercookedDemo.domain.Person;

public record RecipeAuthorDto(Long id, String username, String name, String surname, boolean isAdmin) {
	public RecipeAuthorDto(Person person) {
		this(person.getId(), person.getUsername(), person.getName(), person.getSurname(), person.getAdmin());
	}
}
