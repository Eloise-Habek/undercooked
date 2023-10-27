package hr.fer.progi.UndercookedDemo.service;

import java.util.List;

import hr.fer.progi.UndercookedDemo.domain.Person;

public interface PersonService {
	List<Person> listAll();
	
	Person createPerson(Person person);
}
