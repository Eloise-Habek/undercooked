package hr.fer.progi.UndercookedDemo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.EntityMissingException;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RequestDeniedException;

import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceJpa implements PersonService {

	@Autowired
	private PersonRepository PersonRepo;

	@Override
	public List<Person> listAll() {
		return PersonRepo.findAll();
	}

	@Override
	public Optional<Person> findById(long PersonId) {
		return PersonRepo.findById(PersonId);
	}

	@Override
	public Optional<Person> findByUsername(String username) {
		Assert.notNull(username, "Username must be given");
		return PersonRepo.findByUsername(username);
	}

	@Override
	public Optional<Person> findByEmail(String email) {
		Assert.notNull(email, "Username must be given");
		return PersonRepo.findByEmail(email);
	}

	@Override
	public Person fetch(long PersonId) {
		return findById(PersonId).orElseThrow(() -> new EntityMissingException(Person.class, PersonId));
	}

	@Override
	public Person createPerson(Person person) {
		validate(person);
		Assert.isNull(person.getId(), "Person ID must be null, not: " + person.getId());
		if (PersonRepo.countByUsername(person.getUsername()) > 0)
			throw new RequestDeniedException("Person with username " + person.getUsername() + " already exists");
		if (PersonRepo.countByEmail(person.getEmail()) > 0)
			throw new RequestDeniedException("Person with email " + person.getEmail() + " already exists");
		Person newPerson = new Person();
		newPerson.setEmail(person.getEmail());
		newPerson.setUsername(person.getUsername());
		PasswordEncoder pe = new BCryptPasswordEncoder();
		newPerson.setPassword(pe.encode(person.getPassword()));
		return PersonRepo.save(newPerson);
	}

	@Override
	public Person deletePerson(long PersonId) {
		Person Person = fetch(PersonId);
		PersonRepo.delete(Person);
		return Person;
	}

	private void validate(Person person) {
		Assert.notNull(person, "Person object must be given");
		String username = person.getUsername();
		Assert.hasText(username, "Username must be given");
		String email = person.getEmail();
		Assert.hasText(email, "Email must be given");
		String password = person.getPassword();
		Assert.hasText(password, "Passowrd must be given");
	}

}
