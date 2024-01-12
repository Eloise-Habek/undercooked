package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.RecipeCategory;
import hr.fer.progi.UndercookedDemo.service.RequestDeniedException;
import hr.fer.progi.UndercookedDemo.service.SearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipes/search")
public class SearchController {

	private final SearchService searchService;

	public SearchController(SearchService searchService) {
		this.searchService = searchService;
	}

	@GetMapping
	public List<Recipe> search(
			@RequestParam(value = "q", required = false) String query,
			@RequestParam(value = "category", required = false) RecipeCategory category,
			@RequestParam(value = "tags", required = false) List<String> tags
	) {
		if (query != null) {
			var keywords = query.split(" ");

			if (keywords.length == 0)
				throw new RequestDeniedException("Include non-empty `q` parameters");

			return searchService.searchByKeywords(keywords, category, tags);
		}

		return searchService.findAll(category, tags);
	}
}
