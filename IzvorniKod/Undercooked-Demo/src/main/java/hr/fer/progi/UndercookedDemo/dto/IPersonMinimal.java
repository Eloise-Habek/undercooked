package hr.fer.progi.UndercookedDemo.dto;

/**
 * A minimal person object that doesn't have nested entities to avoid infinite recursion during JSON serialisation.
 */
public interface IPersonMinimal {

	Long getId();

	String getUsername();

	String getName();

	String getSurname();

	Boolean getAdmin();
}
