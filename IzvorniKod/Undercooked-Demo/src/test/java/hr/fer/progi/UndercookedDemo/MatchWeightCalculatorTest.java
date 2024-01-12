package hr.fer.progi.UndercookedDemo;

import hr.fer.progi.UndercookedDemo.service.SearchService;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

public class MatchWeightCalculatorTest {
	@Test
	public void TestBasics() {
		Assert.isTrue(SearchService.MatchWeightCalculator.pow(0) == 0, ""); // Nula u nuli,
		Assert.isTrue(SearchService.MatchWeightCalculator.pow(1) == 1, ""); // jedan u jedan,
		Assert.isTrue(SearchService.MatchWeightCalculator.pow(2) == 1.5, ""); // raste
		Assert.isTrue(SearchService.MatchWeightCalculator.pow(3) == 1.75, ""); // i raste
		Assert.isTrue(SearchService.MatchWeightCalculator.pow(Double.POSITIVE_INFINITY) == 2, ""); // asimptotski prema dva.
	}
}
