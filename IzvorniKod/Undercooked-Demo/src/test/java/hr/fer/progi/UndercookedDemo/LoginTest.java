package hr.fer.progi.UndercookedDemo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginTest extends SeleniumTestBase {

	private String validUname = "pero";
	private String validPass = "zdero123";
	private String invalidUname = "zdero";
	private String invalidPass = "pero123";

	@Test
	public void loginTestValid() {

		driver.get(baseUrl + "/login");

		WebElement usernameInput = driver.findElement(By.name("username"));
		WebElement passwordInput = driver.findElement(By.name("password"));
		WebElement loginButton = driver.findElement(By.className("login_button"));

		usernameInput.sendKeys(validUname);
		passwordInput.sendKeys(validPass);
		loginButton.click();

		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/profile/" + validUname, url);
	}

	@Test
	public void loginTestInvalid() {

		driver.get(baseUrl + "/login");

		WebElement usernameInput = driver.findElement(By.name("username"));
		WebElement passwordInput = driver.findElement(By.name("password"));
		WebElement loginButton = driver.findElement(By.className("login_button"));

		usernameInput.sendKeys(invalidUname);
		passwordInput.sendKeys(invalidPass);
		loginButton.click();

		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/login", url);
	}
}
