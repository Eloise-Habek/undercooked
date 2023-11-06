package hr.fer.progi.UndercookedDemo.rest;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;

@RestController
@RequestMapping("/persons")
public class PersonController {
	
	@Autowired
	private PersonService personService;
	
	/**
	 * Ruta za dodavanje korisnika.
	 * @param person
	 * @return status dodavanja.
	 */
	
	@PostMapping("/add")
	public String createPerson(@RequestBody Person person) {
		try {
			personService.createPerson(person);
			return "Osoba uspješno dodana!";
		}
		catch(Exception exc) {
			return "Osoba nije dodana!";
		}
	}
	
	/**
	 * Ruta za brisanje korisnika
	 * @param person
	 * @return status brisanja
	 */
	
	@PostMapping("/delete")
	public String deletePerson(@RequestBody Person person) {
		try {
			personService.deletePerson(person);
			return "Osoba uspješno obrisana!";
		}
		catch(Exception exc) {
			return "Osoba nije obrisana!";
		}
	}
	
	
}
