package hr.fer.progi.UndercookedDemo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.*;

import java.util.List;

@RestController
@RequestMapping("/persons")
public class PersonController {
	
	@Autowired
	private PersonService personService;

	@GetMapping("")
	public List<Person> listPersons() {
		return personService.listAll();
	}

	@GetMapping("/{id}")
	public Person getPerson(@PathVariable("id") long id) {
		return personService.fetch(id);
	}


	@DeleteMapping("/{id}")
	public Person deletePerson(@PathVariable("id") long PersonId) {
		return personService.deletePerson(PersonId);
	}
}
