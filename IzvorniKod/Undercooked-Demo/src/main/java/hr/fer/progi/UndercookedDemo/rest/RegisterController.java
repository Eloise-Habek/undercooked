package hr.fer.progi.UndercookedDemo.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;

@RestController
@RequestMapping("/register")
public class RegisterController {
	
	@Autowired
	private PersonService personService;
	
	@GetMapping("")
	public String registerScreen() {
		return "REGISTER";
		
	}
	
	@PostMapping("")
	public MessageResponse createPerson(@RequestBody Person Person) {
		String rezultat = new String("User added");
		try {
			personService.createPerson(Person);
		}catch(Exception exc) {
			rezultat = exc.getMessage();
		}
		return new MessageResponse(rezultat);
	}

}
