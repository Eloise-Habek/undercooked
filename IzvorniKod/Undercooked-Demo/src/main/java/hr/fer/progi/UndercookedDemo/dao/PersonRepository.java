package hr.fer.progi.UndercookedDemo.dao;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Person;

/**
 * Razred koji predstavlja implementaciju repozitorija svih osoba.
 */

public interface PersonRepository extends JpaRepository<Person, Long> {
	
	/**
	 * Funkcija nalazi osobu prema njenon mailu.
	 * @param email
	 * @return 
	 */
	
	Optional<Person>  findByEmail(String email);
	
	/**
	 * Funkcija nalazi osobu prema njenon usernameu.
	 * @param username
	 * @return 
	 */
	
	Optional<Person> findByUsername(String username);
	
	/**
	 * Funkcija koja broji broj ljudi sa zadanim usernameom.
	 * @param username
	 * @return 
	 */
	
	int countByUsername(String username);
	
	/**
	 * Funkcija koja broji broj ljudi sa zadanim mailom.
	 * @param email
	 * @return 
	 */
	
	int countByEmail(String email);

}
