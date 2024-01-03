package hr.fer.progi.UndercookedDemo.model;

import java.util.List;

import hr.fer.progi.UndercookedDemo.domain.Recipe;

public record FollowersResponse(String username, long followers, long following, List<Recipe> recipes, boolean isFollowed) {

}
