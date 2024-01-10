package hr.fer.progi.UndercookedDemo.rest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.service.FollowersService;

@RestController
@RequestMapping("/feed")
public class FeedController {
	
	@Autowired
	private FollowersService followersService;
	
	@GetMapping("/recipes")
	public List<Recipe> getFollowingRecipes(Principal principal){
		List<Person> following = followersService.getFollowing(principal.getName());
		List<Recipe> recipes = new ArrayList<>();
		for(Person p : following) {
			recipes.addAll(p.getRecipes());
		}
		recipes.sort((r1, r2) -> Long.compare(r2.getId(), r1.getId()));
		return recipes;
	}
	

}
