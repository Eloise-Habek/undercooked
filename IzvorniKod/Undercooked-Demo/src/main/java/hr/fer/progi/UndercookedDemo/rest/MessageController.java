package hr.fer.progi.UndercookedDemo.rest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("")
	public String getMessage() {
		return "Message";
	}

	@PostMapping("")
	public Message sendMessage(@RequestBody Map<String, String> json) {
		return service.createMessage(json.get("text"), json.get("sender"), json.get("receiver"));
	}
	
	@GetMapping("allMessages")
	public List<Message> allMessages(){
		return service.getAllMessages();
	}
}
