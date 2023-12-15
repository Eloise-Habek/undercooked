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
	public Person myProfile(Principal user) {
		System.out.println(user.toString());
		if(user.getName().equals("admin")) return new Person(Long.valueOf(0), "admin", "undercooked@fer.hr", "pass", "admin", "admin");
		return personService.fromPrincipal(user);
	}

}