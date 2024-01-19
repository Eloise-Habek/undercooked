package hr.fer.progi.UndercookedDemo.dao;

import hr.fer.progi.UndercookedDemo.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
	Optional<Ingredient> findByNameEqualsIgnoreCase(String name);
}
