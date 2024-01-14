package hr.fer.progi.UndercookedDemo.Selenium;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class SeleniumTestBase {

	public final String baseUrl = "http://localhost:3000";

	protected WebDriver driver;

	@BeforeEach
	public void setup() {
		driver = new FirefoxDriver();
	}

	@AfterEach
	public void exit() {
		driver.quit();
	}

}
