package hr.fer.progi.UndercookedDemo.rest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.security.sasl.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.dao.MessageRepository;
import hr.fer.progi.UndercookedDemo.domain.Message;
import hr.fer.progi.UndercookedDemo.model.UserResponse;
import hr.fer.progi.UndercookedDemo.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {
	
	@Autowired
	private MessageService service;
	
	@Autowired
	private MessageRepository repo;

	/**
	 * Ruta za slanje poruke.
	 * @param json koji se sastoji od text, sender, receiver
	 * @return
	 */
	
	@PostMapping("")
	public Message sendMessage(@RequestBody Map<String, String> json) {
		return service.createMessage(json.get("text"), json.get("sender"), json.get("receiver"));
	}
	
	/**
	 * Vraća sve poruke od ulogiranog korisnika (ako je on sender ili receiver)
	 * @param principal
	 * @return
	 */
	
	@GetMapping("getMessages")
	public List<UserResponse> allMessages(Principal principal){
		List<Message> messages = service.getAllMessages();
		List<Message> userMessages = messages.stream().filter((m) -> m.getReceiver().getUsername().equals(principal.getName()) || 
																	 m.getSender().getUsername().equals(principal.getName())).collect(Collectors.toList());
		List<UserResponse> list = new ArrayList<>();
		for(Message m : userMessages) {
			list.add(new UserResponse(m.getId(), m.getText(), m.getSender().getUsername(), m.getReceiver().getUsername(), m.getTime(), m.isRead()));
		}
		return list;
	}
	
	/**
	 * Vraca poruku po id (ne moze vratiti tude poruke)
	 * @param id
	 * @param principal
	 * @return
	 * @throws AuthenticationException
	 */
	
	/**
	 * Ruta za dohvat poruke, ako receiver dohvaca poruku <code>read</code> postaje <code>true</code>
	 * @param id
	 * @param principal
	 * @return
	 * @throws AuthenticationException
	 */
	
	@GetMapping("getMessages/{id}")
	public UserResponse getMessage(@PathVariable("id") Long id, Principal principal) throws AuthenticationException {
		Message message = service.findMessageById(id).get();
		if(!message.getReceiver().getUsername().equals(principal.getName()) && !message.getSender().getUsername().equals(principal.getName()))
			throw new AuthenticationException("Not authenticated for this message");
		return new UserResponse(message.getId(), message.getText(), message.getSender().getUsername(), message.getReceiver().getUsername(), message.getTime(), message.isRead());
	}
	
	/**
	 * Vraca broj neprocitanih poruka (samo ako je korisnik receiver)
	 * @param principal
	 * @return
	 */
	
	@GetMapping("getUnread")
	public int getNumberOfUnReadedMessages(Principal principal) {
		List<Message> messages = service.getAllMessages();
		int number = 0;
		for(Message m : messages) {
			if(m.getReceiver().getUsername().equals(principal.getName()) && !m.isRead()) {
				number++;
			}
		}
		return number;
	}
	
	@PostMapping("read/{id}")
	public void readMessage(@PathVariable("id") Long id, Principal principal) {
		Message message = service.findMessageById(id).get();
		if(message.getReceiver().getUsername().equals(principal.getName())) {
			message.setRead(true);
			repo.save(message);
		}
	}
}
