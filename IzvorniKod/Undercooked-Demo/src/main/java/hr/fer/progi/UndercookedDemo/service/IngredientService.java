package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.IngredientRepository;
import hr.fer.progi.UndercookedDemo.domain.Ingredient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

	private final IngredientRepository repo;

	public IngredientService(IngredientRepository repo) {
		this.repo = repo;
	}

	public List<Ingredient> listAll() {
		return repo.findAll();
	}

	public void fillInformation(Ingredient ingredient) {
		if (ingredient.getId() == null) {
			var addedOrExisting = getOrAddByName(ingredient.getName());
			ingredient.setId(addedOrExisting.getId());
			ingredient.setName(addedOrExisting.getName());
		} else if (ingredient.getName() == null) {
			var existing = repo.getReferenceById(ingredient.getId());
			ingredient.setName(existing.getName());
		}
	}

	private Ingredient getOrAddByName(String name) {
		name = name.trim();

		var ingredient = repo.findByNameEqualsIgnoreCase(name);
		if (ingredient.isPresent()) {
			return ingredient.get();
		}

		var newIngredient = new Ingredient();
		newIngredient.setName(name);
		repo.save(newIngredient);
		return newIngredient;
	}
}
