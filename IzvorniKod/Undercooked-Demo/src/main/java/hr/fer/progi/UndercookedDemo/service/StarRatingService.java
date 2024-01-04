package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.StarRatingRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.StarRating;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class StarRatingService {

	private final StarRatingRepository repo;

	public StarRatingService(StarRatingRepository repo) {
		this.repo = repo;
	}

	public StarRating addOrUpdateRating(StarRating rating) {
		Assert.isNull(rating.getId(), "StarRating.id not null");

		var existing = repo.findByPersonAndRecipe(rating.getPerson(), rating.getRecipe());

		if (existing.isPresent()) {
			var r = existing.get();
			r.setRating(rating.getRating());
			repo.save(r);
			return r;
		} else {
			repo.save(rating);
			return rating;
		}
	}

	public void removeRating(StarRating rating) {
		Assert.notNull(rating.getId(), "StarRating.id is null");
		repo.delete(rating);
	}

	public StarRating getRating(Person person, Recipe recipe) {
		return repo.findByPersonAndRecipe(person, recipe).orElseThrow(() -> new EntityMissingException(StarRating.class, person, recipe));
	}
}
