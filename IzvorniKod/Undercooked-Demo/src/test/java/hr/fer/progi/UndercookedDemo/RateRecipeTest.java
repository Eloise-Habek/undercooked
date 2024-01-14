package hr.fer.progi.UndercookedDemo;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RateRecipeTest {

	private String baseUrl = "http://localhost:3000";
	private String validUname = "pero";
	private String validPass = "zdero123";
	private WebDriver driver;
	
	@BeforeEach
	public void setup(){
		driver = new FirefoxDriver();
	}
	
	@AfterEach
	public void exit() {
		driver.quit();
	}
	
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
		
		driver.get(baseUrl + "/login");
		
		WebElement usernameInput = driver.findElement(By.name("username"));
		WebElement passwordInput = driver.findElement(By.name("password"));
		WebElement loginButton = driver.findElement(By.className("login_button"));
		
		usernameInput.sendKeys(validUname);
		passwordInput.sendKeys(validPass);
		loginButton.click();
		
		driver.get(baseUrl + "/recipe/1");
		
		List<WebElement> stars = driver.findElements(By.className("fa-star"));
		WebElement starButton = driver.findElement(By.id("stars-1"));
		
		starButton.click();
		
		assertEquals("rgb(255, 165, 0)", stars.get(0).getCssValue("color"));
		assertEquals("rgba(0, 0, 0, 0)", stars.get(1).getCssValue("color"));
	}
}
