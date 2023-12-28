package hr.fer.progi.UndercookedDemo.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Message {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String text;
	
	@ManyToOne
	private Person sender;
	
	@ManyToOne
	private Person receiver;
	
	private LocalDateTime time;
	
	private boolean read;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isRead() {
		return read;
	}

	public void setRead(boolean read) {
		this.read = read;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Person getSender() {
		return sender;
	}

	public void setSender(Person sender) {
		this.sender = sender;
	}

	public Person getReceiver() {
		return receiver;
	}

	public void setReceiver(Person receiver) {
		this.receiver = receiver;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", text=" + text + ", sender=" + sender + ", receiver=" + receiver + ", time="
				+ time + "]";
	}

}
