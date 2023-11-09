package hr.fer.progi.UndercookedDemo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable());
		http.headers().frameOptions().disable();
		http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login")
				.deleteCookies("JSESSIONID").clearAuthentication(true).invalidateHttpSession(true);
		return http.authorizeRequests(auth -> {
			auth.antMatchers("/", "/login", "/register").permitAll();
			auth.antMatchers("/profile").hasRole("USER");
			auth.antMatchers("/persons/**", "/h2-console/**").hasRole("ADMIN");
		}).httpBasic(withDefaults()).build();
	}

}