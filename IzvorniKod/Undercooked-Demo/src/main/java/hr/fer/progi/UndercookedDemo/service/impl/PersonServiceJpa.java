package hr.fer.progi.UndercookedDemo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;

@Service
public class PersonServiceJpa implements PersonService{
	
	@Autowired
	private PersonRepository personRepo;
	
	@Override
	public List<Person> listAll() {
		return personRepo.findAll();
	}

	@Override
	public Person createPerson(Person person) {
		Assert.notNull(person, "Osoba mora postojati!");
		return personRepo.save(person);
	}
	
}
