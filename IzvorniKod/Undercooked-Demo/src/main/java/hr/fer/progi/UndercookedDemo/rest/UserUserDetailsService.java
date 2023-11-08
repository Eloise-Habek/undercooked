package hr.fer.progi.UndercookedDemo.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserUserDetailsService implements UserDetailsService {
	
	@Autowired
	PersonRepository personRepo;
	
	@Bean
	public PasswordEncoder passwordEnc() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (username.equals("admin")) {
			return new User(username, "$2a$10$VVOEMN1nR5DNU.tUsoj4ju85DMXXQfFfS0VZbPVC6RjHqLA1RezJO", commaSeparatedStringToAuthorityList("ROLE_ADMIN, ROLE_USER"));
		}
		Optional<Person> person = personRepo.findByUsername(username);
		if (person.isEmpty()) {
			throw new UsernameNotFoundException(username);
		} else {
			System.out.println("proba");
			return new User(username, person.get().getPassword(), commaSeparatedStringToAuthorityList("ROLE_USER"));
		}
	}

}