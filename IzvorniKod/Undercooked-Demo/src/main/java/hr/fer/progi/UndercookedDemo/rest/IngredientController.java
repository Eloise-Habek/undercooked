package hr.fer.progi.UndercookedDemo.rest;

import hr.fer.progi.UndercookedDemo.domain.Ingredient;
import hr.fer.progi.UndercookedDemo.service.IngredientService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
public class IngredientController {

	final IngredientService service;

	public IngredientController(IngredientService service) {
		this.service = service;
	}

	@GetMapping
	public List<Ingredient> listAll() {
		return service.listAll();
	}
}
