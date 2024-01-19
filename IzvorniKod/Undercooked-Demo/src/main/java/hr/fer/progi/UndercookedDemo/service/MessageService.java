package hr.fer.progi.UndercookedDemo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.progi.UndercookedDemo.dao.MessageRepository;
import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Message;

@Service
public class MessageService {

	@Autowired
	private MessageRepository messageRepo;
	
	@Autowired
	private PersonRepository personRepo;
	
	public Message createMessage(String text, String sender, String receiver) {
		Objects.requireNonNull(text, "Message text can not be null");
		Objects.requireNonNull(sender, "Message sender can not be null");
		Objects.requireNonNull(receiver, "Message receiver can not be null");
		Message newMessage = new Message();
		newMessage.setSender(Objects.requireNonNull(personRepo.findByUsername(sender).get(), "Sender does not exist"));
		newMessage.setReceiver(Objects.requireNonNull(personRepo.findByUsername(receiver).get(), "Receiver does not exist"));
		newMessage.setText(text);
		newMessage.setTime(LocalDateTime.now());
		messageRepo.save(newMessage);
		return newMessage;
	}

	public List<Message> getAllMessages(){
		return messageRepo.findAll();
	}
	
	public Optional<Message> findMessageById(long id) {
		return messageRepo.findById(id);
	}
}
