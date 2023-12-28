package hr.fer.progi.UndercookedDemo.rest;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;


@RestController
@RequestMapping("/profile")
public class ProfileController {

	@Autowired
	PersonService personService;
	
	//treba popraviti
	@GetMapping("")
	public Person myProfile(Principal principal) {
		Optional<Person> person = personService.findByUsername(principal.getName());
		if(principal.getName().equals("admin")) {
			Person p = new Person();
			p.setUsername("admin");
			p.setEmail("undercooked@fer.hr");
			p.setName("admin");
			p.setEmail("admin");
			return p;
		}
		return person.get();
	}

}