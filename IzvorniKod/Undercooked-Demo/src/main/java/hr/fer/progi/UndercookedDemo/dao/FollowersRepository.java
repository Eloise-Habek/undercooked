package hr.fer.progi.UndercookedDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Followers;

public interface FollowersRepository extends JpaRepository<Followers, Long>{

}
