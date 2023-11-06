package hr.fer.progi.UndercookedDemo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Person;

/**
 * Razred koji predstavlja implementaciju repozitorija svih osoba.
 */

public interface PersonRepository extends JpaRepository<Person, Long> {
	
	List<Person> findByEmail(String email);
	
	List<Person> findByUserName(String userName);

}
