package hr.fer.progi.UndercookedDemo.security;

import hr.fer.progi.UndercookedDemo.dao.PersonRepository;
import hr.fer.progi.UndercookedDemo.domain.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

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
		Optional<Person> person = personRepo.findByUsername(username);
		if (person.isEmpty()) {
			throw new UsernameNotFoundException(username);
		} else {
			return new User(username, person.get().getPassword(), commaSeparatedStringToAuthorityList(person.get().getAdmin() ? "ROLE_ADMIN, ROLE_USER" : "ROLE_USER"));
		}
	}

}