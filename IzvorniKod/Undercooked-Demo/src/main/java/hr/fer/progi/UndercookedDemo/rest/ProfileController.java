package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.dto.PersonPublicDto;
import hr.fer.progi.UndercookedDemo.model.FollowersResponse;
import hr.fer.progi.UndercookedDemo.service.FollowersService;
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
	private PersonService personService;

	@Autowired
	private FollowersService followersService;

	// treba popraviti
	@GetMapping("")
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Person myProfile(Principal principal) {
		Optional<Person> person = personService.findByUsername(principal.getName());
		return person.get();
	}

//	@GetMapping("/{username}")
//	public PersonPublicDto profile(@PathVariable("username") String username) {
//		var person = personService.findByUsername(username);
//		return new PersonPublicDto(person.orElseThrow(() -> new RequestDeniedException("Profile not found")));
//	}

	@GetMapping("/{username}")
	public FollowersResponse profile(@PathVariable("username") String username, Principal principal) {
		var person = personService.findByUsername(username).get();
		return new FollowersResponse(person.getUsername(), followersService.numberOfFollowers(username),
				followersService.numberOfFollowing(username), person.getRecipes(), person.getRatings(),
				principal != null && followersService.isFollowing(principal.getName(), username));
	}
}