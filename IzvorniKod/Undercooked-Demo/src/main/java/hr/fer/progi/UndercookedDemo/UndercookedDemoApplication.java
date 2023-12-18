package hr.fer.progi.UndercookedDemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import hr.fer.progi.UndercookedDemo.security.RsaKeyProperties;

/**
 * Razred koji predstavlja aplikaciju.
 */

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class UndercookedDemoApplication {


	public static void main(String[] args) {
		SpringApplication.run(UndercookedDemoApplication.class, args);
	}

}
