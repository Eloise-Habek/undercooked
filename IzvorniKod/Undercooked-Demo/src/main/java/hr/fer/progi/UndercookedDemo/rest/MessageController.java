package hr.fer.progi.UndercookedDemo.rest;

import java.security.Principal;
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

import hr.fer.progi.UndercookedDemo.domain.Message;
import hr.fer.progi.UndercookedDemo.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {
	
	@Autowired
	private MessageService service; 

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
	
	@GetMapping("allMessages")
	public List<Message> allMessages(Principal principal){
		List<Message> messages = service.getAllMessages();
		System.out.println(messages);
		List<Message> userMessages = messages.stream().filter((m) -> m.getReceiver().getUsername().equals(principal.getName()) || 
																	 m.getSender().getSurname().equals(principal.getName())).collect(Collectors.toList());
		return userMessages;
	}
	
	/**
	 * Vraca poruku po id (ne moze vratiti tude poruke)
	 * @param id
	 * @param principal
	 * @return
	 * @throws AuthenticationException
	 */
	
	@GetMapping("getMessages/{id}")
	public Message getMessage(@PathVariable("id") Long id, Principal principal) throws AuthenticationException {
		Message message = service.findMessageById(id).get();
		if(!message.getReceiver().getSurname().equals(principal.getName()) && !message.getSender().getUsername().equals(principal.getName()))
			throw new AuthenticationException("Not authenticated for this message");
		return message;
	}
}
