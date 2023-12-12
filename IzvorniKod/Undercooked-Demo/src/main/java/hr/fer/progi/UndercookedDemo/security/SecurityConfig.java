package hr.fer.progi.UndercookedDemo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//	@Bean
//	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//		http.cors(Customizer.withDefaults());
//		http.csrf(csrf -> csrf.disable());
//		http.headers().frameOptions().disable();
//		http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login")
//				.deleteCookies("JSESSIONID").clearAuthentication(true).invalidateHttpSession(true);
//		return http.authorizeRequests(auth -> {
//			auth.antMatchers("/", "/login", "/register").permitAll();
//			auth.antMatchers("/profile").hasRole("USER");
//			auth.antMatchers("/persons/**", "/h2-console/**").hasRole("ADMIN");
//		}).httpBasic(withDefaults()).build();
//	}
//	
	@Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http
        		.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/", "/login", "/register").permitAll();
                    auth.requestMatchers("/profile").hasRole("USER");
                    auth.requestMatchers("/persons").hasRole("ADMIN");
                })
                .httpBasic(withDefaults())
                .build();
    }
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList(CorsConfiguration.ALL));
        configuration.setAllowedHeaders(List.of("Content-Type", "Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}