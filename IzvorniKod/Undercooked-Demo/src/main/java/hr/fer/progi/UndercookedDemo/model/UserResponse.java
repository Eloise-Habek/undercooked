package hr.fer.progi.UndercookedDemo.model;

import java.time.LocalDateTime;

public record UserResponse(Long id, String text, String sender, String receiver, LocalDateTime time) {

}
