package hr.fer.progi.UndercookedDemo.Selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class SeleniumTestBase {

	public final String baseUrl = "http://localhost:3000";
	protected final String validUname = "pero";
	protected final String validPass = "zdero123";

	protected WebDriver driver;

	@BeforeEach
	public void setup() {
		driver = new FirefoxDriver();
	}

	@AfterEach
	public void exit() {
		driver.quit();
	}
	
	protected void login(String username, String password) {
		driver.get(baseUrl + "/login");

		WebElement usernameInput = driver.findElement(By.name("username"));
		WebElement passwordInput = driver.findElement(By.name("password"));
		WebElement loginButton = driver.findElement(By.className("login_button"));

		usernameInput.sendKeys(username);
		passwordInput.sendKeys(password);
		loginButton.click();
	}
}
