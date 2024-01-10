package hr.fer.progi.UndercookedDemo.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hr.fer.progi.UndercookedDemo.dto.IPersonMinimal;
import hr.fer.progi.UndercookedDemo.dto.IPersonPublic;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

@Entity
@JsonSerialize(as = IPersonPublic.class)
public final class Person implements IPersonPublic, IPersonMinimal {

	@Id
	@GeneratedValue
	private Long id;

	@Column(unique = true, nullable = false)
	private String username;

	@Column(unique = true, nullable = false)
	private String email;

	private String password;

	private String name;

	private String surname;

	private boolean isAdmin;

	/**
	 * Recipes that this person authored.
	 */
	@OneToMany(mappedBy = Recipe.author_field_name, cascade = CascadeType.REMOVE)
	private List<Recipe> recipes;

	@OneToMany(mappedBy = StarRating.person_field_name, cascade = CascadeType.REMOVE)
	private Collection<StarRating> ratings;

	// added so removing the person will also remove all their comments.
	@OneToMany(mappedBy = Comment.author_field_name, cascade = CascadeType.REMOVE)
	private Collection<Comment> comments;

	/**
	 * Recipes that this person has saved for later.
	 */
	@ManyToMany
	@OrderColumn
	private List<Recipe> savedRecipes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Boolean getAdmin() {
		return isAdmin;
	}

	public void setAdmin(Boolean admin) {
		isAdmin = admin;
	}

	public List<Recipe> getRecipes() {
		return recipes;
	}

	public Collection<StarRating> getRatings() {
		return ratings;
	}

	public List<Recipe> getSavedRecipes() {
		return savedRecipes;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		Person person = (Person) o;

		return id.equals(person.id);
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", name="
				+ name + ", surname=" + surname + ", isAdmin=" + isAdmin + ", recipes=" + recipes + "]";
	}

}
