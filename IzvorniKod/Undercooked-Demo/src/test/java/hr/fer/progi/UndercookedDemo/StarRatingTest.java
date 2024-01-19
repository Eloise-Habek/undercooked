package hr.fer.progi.UndercookedDemo;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import hr.fer.progi.UndercookedDemo.domain.StarRating;

public class StarRatingTest {
	
	private StarRating rating;

	@BeforeEach
	public void setup() {
		this.rating = new StarRating();
	}
	
	@ParameterizedTest
	@ValueSource(doubles = {Double.NEGATIVE_INFINITY, Double.MIN_VALUE, Double.MIN_NORMAL, -1, 0, 6, Double.MAX_VALUE, Double.POSITIVE_INFINITY, Double.NaN})
	public void TestSetRatingInvalid(double number) {
		String expected = "Invalid rating: " + number + ". Must be in range 1-5.";
		
		Throwable exception = assertThrows(IllegalArgumentException.class,
				() -> rating.setRating(number)
		);
		assertEquals(expected, exception.getMessage());
	}

	@ParameterizedTest
	@ValueSource(doubles = {1, 2.72, 3.14, 4.20, 5})
	public void TestSetRatingExceptionValid(double number) {
		assertDoesNotThrow(() -> rating.setRating(number));
	}
}
