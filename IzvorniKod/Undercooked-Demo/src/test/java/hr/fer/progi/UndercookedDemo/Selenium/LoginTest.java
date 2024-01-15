package hr.fer.progi.UndercookedDemo.Selenium;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginTest extends SeleniumTestBase {

	private String invalidUname = "zdero";
	private String invalidPass = "pero123";

	@Test
	public void loginTestValid() {

		login(validUname, validPass);

		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/profile/" + validUname, url);
	}

	@Test
	public void loginTestInvalid() {

		login(invalidUname, invalidPass);

		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/login", url);
	}
}
