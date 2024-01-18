package hr.fer.progi.UndercookedDemo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;

@SpringBootTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PersonRepositoryTest {

	@Autowired
	private PersonRepository personRepository;
	
	@Test
	public void TestAddPerson() {
		
		Person person = new Person();
		person.setUsername("RMS");
		person.setEmail("rms@gnu.org");
		person.setName("Richard");
		person.setSurname("Stallman");
		person.setPassword(new BCryptPasswordEncoder().encode("superSecretPassword123"));
		person.setAdmin(false);
		
		Person savedPerson = personRepository.save(person);
		
		assertEquals(person.getUsername(), savedPerson.getUsername());
		assertNotNull(savedPerson.getId());
	}
	
	@Test
	public void TestAddExistingPerson() {
		//Važno je da se ovaj test pokrene nakon prethodnog kako bi se ista osoba dvaput pokušala dodati u bazu
		Person person = new Person();
		person.setUsername("RMS");
		person.setEmail("rms@gnu.org");
		person.setName("Richard");
		person.setSurname("Stallman");
		person.setPassword(new BCryptPasswordEncoder().encode("superSecretPassword123"));
		person.setAdmin(false);

		assertThrows(DataIntegrityViolationException.class,
				() -> personRepository.save(person)
		);
	}
}
