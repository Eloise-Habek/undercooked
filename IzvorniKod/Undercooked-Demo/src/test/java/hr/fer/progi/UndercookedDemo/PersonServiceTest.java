package hr.fer.progi.UndercookedDemo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import hr.fer.progi.UndercookedDemo.domain.Person;
import hr.fer.progi.UndercookedDemo.service.PersonService;

@SpringBootTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PersonServiceTest {
	
	@Autowired
	PersonService personService;
	
	@Test
	public void TestCreatePersonNull() {
		Person person = null;
		String expected = "Person object must be given";
		
		Exception e = assertThrows(IllegalArgumentException.class, () -> personService.createPerson(person));
		assertEquals(expected, e.getMessage());
	}
	
	@Test
	public void TestCreatePersonWithId() {
		Person person = new Person();
		person.setUsername("RMS");
		person.setEmail("rms@gnu.org");
		person.setName("Richard");
		person.setSurname("Stallman");
		person.setPassword(new BCryptPasswordEncoder().encode("superSecretPassword123"));
		person.setAdmin(false);
		person.setId((long) 1337);
		String expected = "Person ID must be null, not: 1337";
		
		Exception e = assertThrows(IllegalArgumentException.class, () -> personService.createPerson(person));
		assertEquals(expected, e.getMessage());
	}
}
