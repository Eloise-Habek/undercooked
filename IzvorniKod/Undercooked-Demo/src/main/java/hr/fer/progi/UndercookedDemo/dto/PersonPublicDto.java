package hr.fer.progi.UndercookedDemo.dto;

import hr.fer.progi.UndercookedDemo.domain.Person;

public record PersonPublicDto(Long id, String username, String name, String surname, boolean isAdmin) {
	public PersonPublicDto(Person person) {
		this(person.getId(), person.getUsername(), person.getName(), person.getSurname(), person.getAdmin());
	}
}
