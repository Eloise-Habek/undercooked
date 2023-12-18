package hr.fer.progi.UndercookedDemo.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;

@Embeddable
public class IngredientWithAmount {

	// TODO: what if it's fractions, eg. "1/2 žlice šećera"
	private Double amount;

	/**
	 * Can be null
	 */
	private String unitOfMeasure;

	@ManyToOne
	private Ingredient ingredient;

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getUnitOfMeasure() {
		return unitOfMeasure;
	}

	public void setUnitOfMeasure(String unitOfMeasure) {
		this.unitOfMeasure = unitOfMeasure;
	}

	public Ingredient getIngredient() {
		return ingredient;
	}

	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}
}
