package hr.fer.progi.UndercookedDemo.Selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;

public class RateRecipeTest extends SeleniumTestBase {

	@Test
	public void rateRecipeNoLogin() {

		driver.get(baseUrl + "/recipe/1");

		List<WebElement> stars_old = driver.findElements(By.className("fa-star"));
		WebElement starButton = driver.findElement(By.id("stars-1"));

		starButton.click();

		List<WebElement> stars = driver.findElements(By.className("fa-star"));

		for (int i = 0; i < stars_old.size(); i++) {
			assertEquals(stars_old.get(i).getCssValue("color"),stars.get(i).getCssValue("color"));
		}
	}

	@Test
	public void rateRecipeLogin() {

		login(validUname, validPass);

		driver.get(baseUrl + "/recipe/1");

		List<WebElement> stars = driver.findElements(By.className("fa-star"));
		WebElement starButton = driver.findElement(By.id("stars-1"));

		starButton.click();

		assertEquals("rgb(255, 165, 0)", stars.get(0).getCssValue("color"));
		assertEquals("rgba(0, 0, 0, 0)", stars.get(1).getCssValue("color"));
	}
}
