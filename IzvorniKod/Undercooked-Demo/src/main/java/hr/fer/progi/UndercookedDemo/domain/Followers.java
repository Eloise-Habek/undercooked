package hr.fer.progi.UndercookedDemo.domain;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Followers {
	
	@Id
	@GeneratedValue
	private long id;

	/**
	 * osoba koja prati
	 */
	
	@ManyToOne
	private Person from;
	
	/**
	 * osoba koju se prati
	 */
	
	@ManyToOne
	private Person to;
	
	public Followers(long id, Person from, Person to) {
		this.id = id;
		this.from = from;
		this.to = to;
	}
	
	
	public Followers(Person from, Person to) {
		this.from = from;
		this.to = to;
	}
	
	public Followers() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Person getFrom() {
		return from;
	}

	public void setFrom(Person from) {
		this.from = from;
	}

	public Person getTo() {
		return to;
	}

	public void setTo(Person to) {
		this.to = to;
	}

	@Override
	public int hashCode() {
		return Objects.hash(from, id, to);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Followers other = (Followers) obj;
		return Objects.equals(from, other.from) && Objects.equals(to, other.to);
	}

	@Override
	public String toString() {
		return "Followers [id=" + id + ", from=" + from + ", to=" + to + "]";
	}

}
