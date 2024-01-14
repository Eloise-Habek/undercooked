package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.domain.RecipeCategory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipes/categories")
public class CategoryController {
	@GetMapping
	public RecipeCategory[] getAll() {
		return RecipeCategory.values();
	}
}
