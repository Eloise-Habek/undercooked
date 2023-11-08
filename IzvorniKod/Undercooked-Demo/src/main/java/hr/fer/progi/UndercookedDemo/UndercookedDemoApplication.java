package hr.fer.progi.UndercookedDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

/**
 * Razred koji predstavlja aplikaciju.
 */

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class UndercookedDemoApplication {


	public static void main(String[] args) {
		SpringApplication.run(UndercookedDemoApplication.class, args);
	}

}
