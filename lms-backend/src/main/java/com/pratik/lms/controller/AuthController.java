package com.pratik.lms.controller;

import com.pratik.lms.entity.Role;
import com.pratik.lms.entity.User;
import com.pratik.lms.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ======================
    // REGISTER USER
    // ======================
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if(existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.STUDENT);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // ======================
    // LOGIN USER
    // ======================
 @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User loginUser) {

    Optional<User> dbUser = userRepository.findByEmail(loginUser.getEmail());

    if(dbUser.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("User not found");
    }

    User user = dbUser.get();

    if(!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid password");
    }

    user.setPassword(null);

    return ResponseEntity.ok(user);
}
}