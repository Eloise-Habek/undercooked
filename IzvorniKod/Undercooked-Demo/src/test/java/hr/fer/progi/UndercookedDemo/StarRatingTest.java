package hr.fer.progi.UndercookedDemo;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import hr.fer.progi.UndercookedDemo.domain.StarRating;

public class StarRatingTest {
	
	private StarRating rating;

	@BeforeEach
	public void setup() {
		this.rating = new StarRating();
	}

	@Test
	public void TestSetRatingExceptionZero() {
		
		double number = 0;
		String expected = "Invalid rating: " + number + ". Must be in range 1-5.";
		
		Throwable exception = assertThrows(IllegalArgumentException.class,
				() -> rating.setRating(number)
		);
		assertEquals(expected, exception.getMessage());
	}

	@Test
	public void TestSetRatingExceptionNegative() {
		
		double number = -5;
		String expected = "Invalid rating: " + number + ". Must be in range 1-5.";
		
		Throwable exception = assertThrows(IllegalArgumentException.class,
				() -> rating.setRating(number)
		);
		assertEquals(expected, exception.getMessage());
	}
	
	@Test
	public void TestSetRatingExceptionHigh() {
		
		double number = 6;
		String expected = "Invalid rating: " + number + ". Must be in range 1-5.";
		
		Throwable exception = assertThrows(IllegalArgumentException.class,
				() -> rating.setRating(number)
		);
		assertEquals(expected, exception.getMessage());
	}

	@Test
	public void TestSetRatingExceptionValidHigh() {
		
		double number = 5;
		assertDoesNotThrow(() -> rating.setRating(number));
	}
	
	@Test
	public void TestSetRatingExceptionValidLow() {
		
		double number = 1;
		assertDoesNotThrow(() -> rating.setRating(number));
	}
}
