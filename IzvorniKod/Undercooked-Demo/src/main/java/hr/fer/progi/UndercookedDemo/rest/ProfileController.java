package hr.fer.progi.UndercookedDemo.rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
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
	public Person myProfile(@AuthenticationPrincipal User user) {
		System.out.println("proba");
		if(user.getUsername().equals("admin")) return new Person(Long.valueOf(0), "admin", "undercooked@fer.hr", "pass", "admin", "admin");
		Optional<Person> person = personService.findByUsername(user.getUsername());
		return person.get();
	}

}