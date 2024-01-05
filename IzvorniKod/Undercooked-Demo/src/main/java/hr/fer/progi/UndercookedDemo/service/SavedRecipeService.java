package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SavedRecipeService {
	private final PersonRepository personRepo;

	public SavedRecipeService(PersonRepository personRepo) {
		this.personRepo = personRepo;
	}

	/**
	 * Saves the recipe for the given person.
	 *
	 * @param person The person that is saving the recipe.
	 * @param recipe The recipe that is being saved.
	 * @return Whether the recipe was actually saved (false if it was already saved)
	 */
	public boolean saveRecipe(Person person, Recipe recipe) {
		var saved = person.getSavedRecipes();

		if (saved.contains(recipe)) {
			return false;
		}

		saved.add(recipe);
		personRepo.save(person);
		return true;
	}
	
	public List<Recipe> allSaved(Person person) {
		return person.getSavedRecipes();
	}
	
	public int savedCount(Person person) {
		return allSaved(person).size();
	}

	/**
	 * Removes the previously saved recipe for the given person.
	 *
	 * @param person The person that is un-saving the recipe.
	 * @param recipe The recipe that was saved.
	 * @return Whether the recipe was actually un-saved (false if it wasn't previously saved)
	 */
	public boolean removeSavedRecipe(Person person, Recipe recipe) {
		var removed = person.getSavedRecipes().remove(recipe);
		personRepo.save(person);
		return removed;
	}

	public boolean isSavedFor(Person person, Recipe recipe) {
		return person.getSavedRecipes().contains(recipe);
	}
}
