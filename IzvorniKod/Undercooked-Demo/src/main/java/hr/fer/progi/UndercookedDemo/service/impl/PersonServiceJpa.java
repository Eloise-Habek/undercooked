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
	
	/**
	 * Funkcija koja kreira korisnike koji imaju jedinstven userName i email.
	 * @throws RuntimeException ako vec postoji takav userName ili email.
	 */

	@Override
	public void createPerson(Person person) {
		Assert.notNull(person, "Osoba mora postojati!");
		Assert.notNull(person.getUserName(), "Osoba mora imat userName!");
		Assert.notNull(person.getEmail(), "Osoba mora imati email!");
		if(personRepo.findByUserName(person.getUserName()).size() != 0 || personRepo.findByEmail(person.getEmail()).size() != 0) {
			throw new RuntimeException();
		}
		 personRepo.save(person);
	}
	
	/**
	 * Funkcija koja briše korisnike, ako takvi postoje.
	 * @throws RuntimeException ako korisnik ne postoji.
	 */

	@Override
	public void deletePerson(Person person) {
		Assert.notNull(person, "Osoba mora postojati!");
		Assert.notNull(person.getUserName(), "Osoba mora imat userName!");
		Assert.notNull(person.getEmail(), "Osoba mora imati email!");
		if(personRepo.findByEmail(person.getEmail()).size() == 0 || personRepo.findByUserName(person.getUserName()).size() == 0) {
			throw new RuntimeException();
		}
		personRepo.delete(person);
	}
	
}
