package hr.fer.progi.UndercookedDemo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hr.fer.progi.UndercookedDemo.dto.IPersonMinimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class Comment implements Comparable<Comment> {

	public static final String recipe_field_name = "recipe";
	public static final String author_field_name = "author";

	@Id
	@GeneratedValue
	private Long id;

	/**
	 * The recipe this comment was posted under.
	 */
	@ManyToOne
	private Recipe recipe;

	@ManyToOne
	private Person author;

	private Date postedAt;

	private String text;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	@JsonIgnore // comments are always tied to a recipe, so there's no need to serialise it over the wire
	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	@JsonSerialize(as = IPersonMinimal.class) // don't serialise the person's recipes.
	public Person getAuthor() {
		return author;
	}

	public void setAuthor(Person author) {
		this.author = author;
	}

	public Date getPostedAt() {
		return postedAt;
	}

	public void setPostedAt(Date postedAt) {
		this.postedAt = postedAt;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Override
	public int compareTo(Comment o) {
		return postedAt.compareTo(o.postedAt);
	}
}
