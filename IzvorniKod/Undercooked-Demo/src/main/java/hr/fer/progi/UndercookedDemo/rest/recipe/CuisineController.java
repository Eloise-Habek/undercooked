package hr.fer.progi.UndercookedDemo.rest.recipe;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hr.fer.progi.UndercookedDemo.domain.RecipeCuisine;

@RestController
@RequestMapping("/recipes/cuisine")
public class CuisineController {	
		@GetMapping
		public RecipeCuisine[] getAll() {
			return RecipeCuisine.values();
		}

}
