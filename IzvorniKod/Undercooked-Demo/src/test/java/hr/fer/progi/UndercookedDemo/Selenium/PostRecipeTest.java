package hr.fer.progi.UndercookedDemo.Selenium;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.openqa.selenium.NoSuchElementException;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

public class PostRecipeTest extends SeleniumTestBase {
	
	private String title = "Riža iz menze";
	private String description = "Riža kakvu možete jesti samo u Cassandri";
	private String prepHours = "1337";
	private String prepMinutes = "4";
	private String ingredient = "Riža? Može i šljunak";
	private String ingredientAmount = "1337";
	private String[] koraci = {"1: Stani u red\n", "2: Čekaj 5 minuta do 1 sat\n", "3: Uzmi rižu\n", "4: Sjedi za stol\n", "5: Uživaj u riži :)"};
	
	@Test
	public void postRecipeValid() {
		
		login(validUname, validPass);
		
		driver.get(baseUrl + "/recipe/post");
		
		WebElement recipeTitleInput = driver.findElement(By.name("title"));
		WebElement recipeDescriptionInput = driver.findElement(By.id("description"));
		WebElement prepHoursInput = driver.findElement(By.name("time_h"));
		WebElement prepMinutesInput = driver.findElement(By.name("time_min"));
		WebElement addIngredientButton = driver.findElement(By.xpath("//*[text()='Add ingredient']"));
		addIngredientButton.click();
		WebElement ingredientNameInput = driver.findElement(By.name("ingredient 0"));
		WebElement ingredientAmountInput = driver.findElement(By.name("ingredient 0 amount"));
		WebElement ingredientUnitSelect = driver.findElement(By.name("ingredient 0 unitOfMeasure"));
		WebElement prepDescriptionInput = driver.findElement(By.name("prep_desc"));
		WebElement postRecipeButton = driver.findElement(By.xpath("//*[text()='Post recipe']"));
		
		recipeTitleInput.sendKeys(title);
		recipeDescriptionInput.sendKeys(description);
		prepHoursInput.sendKeys(prepHours);
		prepMinutesInput.sendKeys(prepMinutes);
		ingredientNameInput.sendKeys(ingredient);
		ingredientAmountInput.sendKeys(ingredientAmount);
		Select select = new Select(ingredientUnitSelect);
		select.selectByIndex(4);
		
		for (int i = 0; i < koraci.length; i++) {
			prepDescriptionInput.sendKeys(koraci[i]);
		}
		
		postRecipeButton.click();
		
		String url = driver.getCurrentUrl();
		String newUrl = url.substring(0, url.lastIndexOf('/'));
		assertNotEquals(baseUrl + "/recipe/post", url);
		assertEquals(baseUrl + "/recipe", newUrl);
	}
	
	@Test
	public void postRecipeNoTitle() {
		
		login(validUname, validPass);
		
		driver.get(baseUrl + "/recipe/post");
		
		WebElement recipeDescriptionInput = driver.findElement(By.id("description"));
		WebElement prepHoursInput = driver.findElement(By.name("time_h"));
		WebElement prepMinutesInput = driver.findElement(By.name("time_min"));
		WebElement addIngredientButton = driver.findElement(By.xpath("//*[text()='Add ingredient']"));
		addIngredientButton.click();
		WebElement ingredientNameInput = driver.findElement(By.name("ingredient 0"));
		WebElement ingredientAmountInput = driver.findElement(By.name("ingredient 0 amount"));
		WebElement ingredientUnitSelect = driver.findElement(By.name("ingredient 0 unitOfMeasure"));
		WebElement prepDescriptionInput = driver.findElement(By.name("prep_desc"));
		WebElement postRecipeButton = driver.findElement(By.xpath("//*[text()='Post recipe']"));
		
		recipeDescriptionInput.sendKeys(description);
		prepHoursInput.sendKeys(prepHours);
		prepMinutesInput.sendKeys(prepMinutes);
		ingredientNameInput.sendKeys(ingredient);
		ingredientAmountInput.sendKeys(ingredientAmount);
		Select select = new Select(ingredientUnitSelect);
		select.selectByIndex(4);
		
		for (int i = 0; i < koraci.length; i++) {
			prepDescriptionInput.sendKeys(koraci[i]);
		}
		
		postRecipeButton.click();
		
		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/recipe/post", url);
	}

	@Test
	public void postRecipeNoLogin() {
		//Iako se gumb ne vidi na početnoj stranici, snalažljivi korisnik i dalje može pokušati objaviti recept bez prijave
		driver.get(baseUrl + "/recipe/post");
		
		WebElement recipeTitleInput;
		WebElement recipeDescriptionInput;
		WebElement prepHoursInput;
		WebElement prepMinutesInput;
		WebElement ingredientNameInput;
		WebElement ingredientAmountInput;
		WebElement ingredientUnitSelect;
		WebElement prepDescriptionInput;
		WebElement postRecipeButton;
		try {
			recipeTitleInput = driver.findElement(By.name("title"));
			recipeDescriptionInput = driver.findElement(By.id("description"));
			prepHoursInput = driver.findElement(By.name("time_h"));
			prepMinutesInput = driver.findElement(By.name("time_min"));
			WebElement addIngredientButton = driver.findElement(By.xpath("//*[text()='Add ingredient']"));
			addIngredientButton.click();
			ingredientNameInput = driver.findElement(By.name("ingredient 0"));
			ingredientAmountInput = driver.findElement(By.name("ingredient 0 amount"));
			ingredientUnitSelect = driver.findElement(By.name("ingredient 0 unitOfMeasure"));
			prepDescriptionInput = driver.findElement(By.name("prep_desc"));
			postRecipeButton = driver.findElement(By.xpath("//*[text()='Post recipe']"));
			recipeTitleInput.sendKeys(title);
			recipeDescriptionInput.sendKeys(description);
			prepHoursInput.sendKeys(prepHours);
			prepMinutesInput.sendKeys(prepMinutes);
			ingredientNameInput.sendKeys(ingredient);
			ingredientAmountInput.sendKeys(ingredientAmount);
			Select select = new Select(ingredientUnitSelect);
			select.selectByIndex(4);
			
			for (int i = 0; i < koraci.length; i++) {
				prepDescriptionInput.sendKeys(koraci[i]);
			}
			
			postRecipeButton.click();
			driver.switchTo().alert().dismiss();
			
		} catch (NoSuchElementException e) {

		}
	}

	@Test
	public void postRecipeNoTime() {
		
		login(validUname, validPass);
		
		driver.get(baseUrl + "/recipe/post");
		
		WebElement recipeTitleInput = driver.findElement(By.name("title"));
		WebElement recipeDescriptionInput = driver.findElement(By.id("description"));
		WebElement addIngredientButton = driver.findElement(By.xpath("//*[text()='Add ingredient']"));
		addIngredientButton.click();
		WebElement ingredientNameInput = driver.findElement(By.name("ingredient 0"));
		WebElement ingredientAmountInput = driver.findElement(By.name("ingredient 0 amount"));
		WebElement ingredientUnitSelect = driver.findElement(By.name("ingredient 0 unitOfMeasure"));
		WebElement prepDescriptionInput = driver.findElement(By.name("prep_desc"));
		WebElement postRecipeButton = driver.findElement(By.xpath("//*[text()='Post recipe']"));
		
		recipeTitleInput.sendKeys(title);
		recipeDescriptionInput.sendKeys(description);
		ingredientNameInput.sendKeys(ingredient);
		ingredientAmountInput.sendKeys(ingredientAmount);
		Select select = new Select(ingredientUnitSelect);
		select.selectByIndex(4);
		
		for (int i = 0; i < koraci.length; i++) {
			prepDescriptionInput.sendKeys(koraci[i]);
		}
		
		postRecipeButton.click();
		
		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/recipe/post", url);
	}

	@Test
	public void postRecipeNoInstructions() {
		// Primjer testa koji pada a (vjerojatno) ne bi trebao
		
		login(validUname, validPass);
		
		driver.get(baseUrl + "/recipe/post");
		
		WebElement recipeTitleInput = driver.findElement(By.name("title"));
		WebElement recipeDescriptionInput = driver.findElement(By.id("description"));
		WebElement prepHoursInput = driver.findElement(By.name("time_h"));
		WebElement prepMinutesInput = driver.findElement(By.name("time_min"));
		WebElement addIngredientButton = driver.findElement(By.xpath("//*[text()='Add ingredient']"));
		addIngredientButton.click();
		WebElement ingredientNameInput = driver.findElement(By.name("ingredient 0"));
		WebElement ingredientAmountInput = driver.findElement(By.name("ingredient 0 amount"));
		WebElement ingredientUnitSelect = driver.findElement(By.name("ingredient 0 unitOfMeasure"));
		WebElement postRecipeButton = driver.findElement(By.xpath("//*[text()='Post recipe']"));
		
		recipeTitleInput.sendKeys(title);
		recipeDescriptionInput.sendKeys(description);
		prepHoursInput.sendKeys(prepHours);
		prepMinutesInput.sendKeys(prepMinutes);
		ingredientNameInput.sendKeys(ingredient);
		ingredientAmountInput.sendKeys(ingredientAmount);
		Select select = new Select(ingredientUnitSelect);
		select.selectByIndex(4);
		
		postRecipeButton.click();
		
		String url = driver.getCurrentUrl();
		assertEquals(baseUrl + "/recipe/post", url);
	}
}
