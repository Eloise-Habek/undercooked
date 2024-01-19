package hr.fer.progi.UndercookedDemo.rest;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.FollowersService;

@RestController
@RequestMapping("/follow")
public class FollowController {
	
	@Autowired
	private FollowersService followersService;
	
	@PostMapping("/{username}")
	public void follow(@PathVariable("username") String username, Principal principal) {
		followersService.addFollower(username, principal.getName());
	}
	
	//treba se popraviti u service
	@PostMapping("/unfollow/{username}")
	public void unfollow(@PathVariable("username") String username, Principal principal) {
		followersService.deleteFollower(username, principal.getName());
	}
	
	@GetMapping("/followers/{username}")
	public List<Person> followers(@PathVariable("username") String username) {
		return followersService.getFollowers(username);
	}
	
	@GetMapping("/following/{username}")
	public List<Person> following(@PathVariable("username") String username) {
		return followersService.getFollowing(username);
	}
	
	@GetMapping("/isFollowing/{username}")
	public boolean isFollowing(@PathVariable("username") String username, Principal principal) {
		return followersService.isFollowing(principal.getName(), username);
	}

}
