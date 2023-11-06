package hr.fer.progi.UndercookedDemo.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomePageController {

	@GetMapping("/")
	public String index() {
		return "Home Page";
	}

}