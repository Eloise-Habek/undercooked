package hr.fer.progi.UndercookedDemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.fer.progi.UndercookedDemo.domain.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{

	
	
}
