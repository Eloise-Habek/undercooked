package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

	private final String mailPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

	private final PersonRepository PersonRepo;

	public PersonService(PersonRepository PersonRepo, @Value("${progi.admin.password}") String adminPasswordHash) {
		this.PersonRepo = PersonRepo;
		seedData(adminPasswordHash);
	}

	public List<Person> listAll() {
		return PersonRepo.findAll();
	}

	public Optional<Person> findById(long PersonId) {
		return PersonRepo.findById(PersonId);
	}

	public Person findByUsername(String username) {
		Assert.notNull(username, "Username must be given");
		return PersonRepo.findByUsername(username).orElseThrow(() -> new EntityMissingException(Person.class, username));
	}

	public Optional<Person> findByEmail(String email) {
		Assert.notNull(email, "Username must be given");
		return PersonRepo.findByEmail(email);
	}

	public Person fetch(long PersonId) {
		return findById(PersonId).orElseThrow(() -> new EntityMissingException(Person.class, PersonId));
	}

	public Person createPerson(Person person) {
		validate(person);
		Assert.isNull(person.getId(), "Person ID must be null, not: " + person.getId());
		if (PersonRepo.countByUsername(person.getUsername()) > 0) throw new RequestDeniedException("Username already exists");
		if (PersonRepo.countByEmail(person.getEmail()) > 0) throw new RequestDeniedException("Email already exists");
		Person newPerson = new Person();
		newPerson.setEmail(person.getEmail());
		newPerson.setUsername(person.getUsername());
		newPerson.setName(person.getName());
		newPerson.setSurname(person.getSurname());
		PasswordEncoder pe = new BCryptPasswordEncoder();
		newPerson.setPassword(pe.encode(person.getPassword()));
		newPerson.setAdmin(false);
		return PersonRepo.save(newPerson);
	}

	public Person deletePerson(long PersonId) {
		Person Person = fetch(PersonId);
		PersonRepo.delete(Person);
		return Person;
	}

	public Person fromPrincipal(Principal principal) {
		return findByUsername(principal.getName());
	}

	private void validate(Person person) {
		Assert.notNull(person, "Person object must be given");
		String username = person.getUsername();
		Assert.hasText(username, "Username must be given");
		String email = person.getEmail();
		Assert.hasText(email, "Email must be given");
		Assert.isTrue(email.matches(mailPattern), "Invalid email");
		String password = person.getPassword();
		Assert.hasText(password, "Password must be given");
		String name = person.getName();
		Assert.hasText(name, "Name must be given");
		String surname = person.getSurname();
		Assert.hasText(surname, "Surname must be given");
	}

	/**
	 * Seeds the database with default data: `admin` and `pero`
	 */
	private void seedData(String adminPasswordHash) {
		var admin = new Person();
		admin.setUsername("admin");
		admin.setEmail("admin.undercooked@fer.hr");
		admin.setName("Admin");
		admin.setSurname("Nimda");
		admin.setPassword(adminPasswordHash);
		admin.setAdmin(true);
		validate(admin);
		PersonRepo.save(admin);

		var pero = new Person();
		pero.setUsername("pero");
		pero.setEmail("pperic@fer.hr");
		pero.setName("Pero");
		pero.setSurname("Ždero");
		pero.setPassword(new BCryptPasswordEncoder().encode("zdero123"));
		pero.setAdmin(false);
		validate(pero);
		PersonRepo.save(pero);
	}
}
