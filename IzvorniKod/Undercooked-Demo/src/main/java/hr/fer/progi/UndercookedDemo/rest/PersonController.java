package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	public void deletePerson(@PathVariable("id") long PersonId) {
		personService.deletePerson(PersonId);
	}

	@GetMapping("/{id}/admin")
	public boolean isAdmin(@PathVariable("id") long id) {
		return personService.fetch(id).getAdmin();
	}

	@PostMapping("/{id}/admin")
	public ResponseEntity<?> setAdmin(@PathVariable("id") long id, @RequestBody boolean isAdmin) {
		var person = personService.fetch(id);
		personService.setAdmin(person, isAdmin);
		return ResponseEntity.noContent().build();
	}
}
