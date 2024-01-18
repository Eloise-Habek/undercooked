package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.model.FollowersResponse;
import hr.fer.progi.UndercookedDemo.service.FollowersService;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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
		return personService.fromPrincipal(principal);
	}

	@PatchMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public Person editMyProfile(Principal principal, @RequestBody Person requestPerson) {
		var person = personService.fromPrincipal(principal);
		return personService.patchPerson(person, requestPerson);
	}

	@DeleteMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public void deleteOwnProfile(Principal principal) {
		var person = personService.fromPrincipal(principal);
		personService.deletePerson(person.getId());
	}

//	@GetMapping("/{username}")
//	public IPersonPublic profile(@PathVariable("username") String username) {
//		var person = personService.findByUsername(username);
//		return person.orElseThrow(() -> new RequestDeniedException("Profile not found"));
//	}

	@GetMapping("/{username}")
	public FollowersResponse profile(@PathVariable("username") String username, Principal principal) {
		var person = personService.findByUsername(username);
		return new FollowersResponse(person.getId(), person.getUsername(), followersService.numberOfFollowers(username),
				followersService.numberOfFollowing(username), person.getRecipes(), person.getRatings(),
				principal != null && followersService.isFollowing(principal.getName(), username));
	}
}