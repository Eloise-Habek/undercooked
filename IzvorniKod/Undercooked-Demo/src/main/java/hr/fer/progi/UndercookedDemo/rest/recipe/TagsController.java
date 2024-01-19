package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.domain.RecipeTag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipes/tags")
public class TagsController {
	@GetMapping
	public RecipeTag[] getAll() {
		return RecipeTag.values();
	}
}
