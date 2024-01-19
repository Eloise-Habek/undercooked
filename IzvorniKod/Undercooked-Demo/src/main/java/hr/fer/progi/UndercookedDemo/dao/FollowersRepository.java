package hr.fer.progi.UndercookedDemo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Followers;
import hr.fer.progi.UndercookedDemo.domain.Person;

public interface FollowersRepository extends JpaRepository<Followers, Long>{

	public Optional<Followers> findByFromAndTo(Person from, Person to);
	
}
