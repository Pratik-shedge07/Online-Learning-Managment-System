package com.pratik.lms.controller;

import com.pratik.lms.entity.Role;
import com.pratik.lms.entity.User;
import com.pratik.lms.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

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

    @PostMapping("/login")
public User login(@RequestBody User loginUser) {

    Optional<User> dbUser = userRepository.findByEmail(loginUser.getEmail());

    if(dbUser.isEmpty()) {
        throw new RuntimeException("User not found");
    }

    User user = dbUser.get();

    if(!passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    user.setPassword(null);

    return user;
}
}