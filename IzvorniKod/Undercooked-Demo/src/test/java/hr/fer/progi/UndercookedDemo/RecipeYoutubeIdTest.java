package hr.fer.progi.UndercookedDemo;

import hr.fer.progi.UndercookedDemo.domain.Recipe;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

public class RecipeYoutubeIdTest {
	private Recipe recipe;

	@BeforeEach
	public void beforeEach() {
		this.recipe = new Recipe();
	}

	@ParameterizedTest
	@NullSource
	@ValueSource(strings = {"gocwRvLhDf8", "dQw4w9WgXcQ", "_POWKV-6G9M"})
	public void testValidRegex(String youtubeId) {
		recipe.setYoutubeEmbedId(youtubeId);
		Assertions.assertEquals(youtubeId, recipe.getYoutubeEmbedId());
	}

	@ParameterizedTest
	@ValueSource(strings = {
			"https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			"https://youtu.be/dQw4w9WgXcQ",
			"ｄＱｗ４ｗ９ＷｇＸｃＱ",
			"sm3504435",
			"",
	})
	public void testInvalidRegex(String invalidId) {
		Assertions.assertThrows(IllegalArgumentException.class, () -> recipe.setYoutubeEmbedId(invalidId));
	}
}
