package hr.fer.progi.UndercookedDemo.dao;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Person;

/**
 * Razred koji predstavlja implementaciju repozitorija svih osoba.
 */

public interface PersonRepository extends JpaRepository<Person, Long> {
	
	Optional<Person>  findByEmail(String email);
	
	Optional<Person> findByUsername(String username);
	
	int countByUsername(String username);
	
	int countByEmail(String email);

}
