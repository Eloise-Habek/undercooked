package hr.fer.progi.UndercookedDemo.dao;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.StarRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StarRatingRepository extends JpaRepository<StarRating, Long> {
	Optional<StarRating> findByPersonAndRecipe(Person person, Recipe recipe);
}
