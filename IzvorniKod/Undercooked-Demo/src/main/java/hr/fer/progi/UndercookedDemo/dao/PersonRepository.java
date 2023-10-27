package hr.fer.progi.UndercookedDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {

}
