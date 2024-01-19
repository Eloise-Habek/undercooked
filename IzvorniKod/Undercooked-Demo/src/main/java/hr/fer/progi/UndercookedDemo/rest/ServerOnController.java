package hr.fer.progi.UndercookedDemo.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/online")
public class ServerOnController {
	@GetMapping("")
	public String index() {
		return "Server is online";
	}
}
