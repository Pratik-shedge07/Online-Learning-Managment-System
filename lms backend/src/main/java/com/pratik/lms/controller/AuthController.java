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
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.STUDENT);
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        Optional<User> dbUser = userRepository.findByEmail(user.getEmail());

        if(dbUser.isPresent() &&
           passwordEncoder.matches(user.getPassword(), dbUser.get().getPassword())) {

            return dbUser.get();
        }

        return null;
    }
}