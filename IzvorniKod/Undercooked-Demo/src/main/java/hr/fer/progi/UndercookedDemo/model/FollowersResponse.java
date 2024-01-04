package hr.fer.progi.UndercookedDemo.model;

import java.util.Collection;
import java.util.List;

import hr.fer.progi.UndercookedDemo.domain.Recipe;
import hr.fer.progi.UndercookedDemo.domain.StarRating;

public record FollowersResponse(String username, long followers, long following, List<Recipe> recipes, Collection<StarRating> ratings, boolean isFollowed) {

}
