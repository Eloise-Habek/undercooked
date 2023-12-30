package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.dto.PersonPublicDto;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;


@RestController
@RequestMapping("/profile")
public class ProfileController {

	@Autowired
	PersonService personService;

	//treba popraviti
	@GetMapping("")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Person myProfile(Principal principal) {
		Optional<Person> person = personService.findByUsername(principal.getName());
		if (principal.getName().equals("admin")) {
			Person p = new Person();
			p.setUsername("admin");
			p.setEmail("undercooked@fer.hr");
			p.setName("admin");
			p.setEmail("admin");
			return p;
		}
		return person.get();
	}

	@GetMapping("/{username}")
	public PersonPublicDto profile(@PathVariable("username") String username) {
		var person = personService.findByUsername(username);
		return new PersonPublicDto(person.orElseThrow(() -> new RequestDeniedException("Profile not found")));
	}
}