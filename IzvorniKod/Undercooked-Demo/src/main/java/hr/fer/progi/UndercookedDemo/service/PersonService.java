package hr.fer.progi.UndercookedDemo.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import hr.fer.progi.UndercookedDemo.domain.Person;

public interface PersonService {

	List<Person> listAll();

	Person fetch(long PersonId);

	Person createPerson(Person Person);

	Optional<Person> findById(long PersonId);

	Optional<Person> findByUsername(String jmbag);

	Optional<Person> findByEmail(String jmbag);

	Person deletePerson(long PersonId);

	Person fromPrincipal(Principal principal);
}
