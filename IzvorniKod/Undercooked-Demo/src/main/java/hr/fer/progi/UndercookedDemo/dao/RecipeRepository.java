package hr.fer.progi.UndercookedDemo.dao;

import hr.fer.progi.UndercookedDemo.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
