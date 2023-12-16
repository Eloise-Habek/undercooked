package hr.fer.progi.UndercookedDemo.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import hr.fer.progi.UndercookedDemo.model.AuthResponse;
import hr.fer.progi.UndercookedDemo.service.TokenService;


@RestController
@RequestMapping("/token")
public class AuthController {

    private final TokenService tokenService;

    public AuthController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("")
    public AuthResponse token(Authentication authentication) {
        return new AuthResponse(tokenService.generateToken(authentication));
    }

}
