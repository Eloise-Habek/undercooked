package hr.fer.progi.UndercookedDemo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private PersonService personService;
	
	@GetMapping("")
	public List<Person> listPersons() {
		return personService.listAll();
	}

}
