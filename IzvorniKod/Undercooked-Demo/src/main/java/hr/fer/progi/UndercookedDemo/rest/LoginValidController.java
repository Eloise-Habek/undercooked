package hr.fer.progi.UndercookedDemo.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/loginValid")
public class LoginValidController {
	@GetMapping("")
	public String index() {
		return "Login is valid";
	}
}
