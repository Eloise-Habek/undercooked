package hr.fer.progi.UndercookedDemo.security;

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
import org.springframework.beans.factory.annotation.Value;

@Service
public class UserUserDetailsService implements UserDetailsService {
	
	@Autowired
	PersonRepository personRepo;
	
	@Value("${progi.admin.password}")
	private String adminPasswordHash;

	
	@Bean
	public PasswordEncoder passwordEnc() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (username.equals("admin")) {
			return new User(username, adminPasswordHash, commaSeparatedStringToAuthorityList("ROLE_ADMIN, ROLE_USER"));
		}
		Optional<Person> person = personRepo.findByUsername(username);
		if (person.isEmpty()) {
			throw new UsernameNotFoundException(username);
		} else {
			return new User(username, person.get().getPassword(), commaSeparatedStringToAuthorityList("ROLE_USER"));
		}
	}

}