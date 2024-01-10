package hr.fer.progi.UndercookedDemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.fer.progi.UndercookedDemo.dao.FollowersRepository;
import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Followers;
import hr.fer.progi.UndercookedDemo.domain.Person;

@Service
public class FollowersService {

	@Autowired
	private FollowersRepository followersRepo;

	@Autowired
	private PersonRepository personRepo;

	public void addFollower(String following, String follower) {
		Person f1 = personRepo.findByUsername(following).get(); // osoba koju se prati
		Person f2 = personRepo.findByUsername(follower).get(); // osoba koja prati
		if (!followersRepo.findAll().contains(new Followers(f2, f1))) {
			followersRepo.save(new Followers(f2, f1));
		}
	}

	// popraviti
	public void deleteFollower(String following, String follower) {
		Person f1 = personRepo.findByUsername(following).get(); // osoba koju se prati
		Person f2 = personRepo.findByUsername(follower).get(); // osoba koja prati
		if (followersRepo.findAll().contains(new Followers(f2, f1))) {
			Followers f = followersRepo.findByFromAndTo(f2, f1).get();
			followersRepo.deleteById(f.getId());
		}
	}

	public long numberOfFollowers(String username) {
		return followersRepo.findAll().stream().filter((f) -> f.getTo().getUsername().equals(username)).count();
	}

	public long numberOfFollowing(String username) {
		return followersRepo.findAll().stream().filter((f) -> f.getFrom().getUsername().equals(username)).count();
	}

	public boolean isFollowing(String follower, String following) {
		for (Followers f : followersRepo.findAll()) {
			if (f.equals(new Followers(personRepo.findByUsername(follower).get(),
					personRepo.findByUsername(following).get())))
				return true;
		}
		return false;
	}
	
	public List<Person> getFollowers(String username){
		return followersRepo.findAll().stream().filter((f) -> f.getTo().getUsername().equals(username)).map(Followers::getFrom).toList();
	}
	
	public List<Person> getFollowing(String username){
		return followersRepo.findAll().stream().filter((f) -> f.getFrom().getUsername().equals(username)).map(Followers::getTo).toList();
	}
}
