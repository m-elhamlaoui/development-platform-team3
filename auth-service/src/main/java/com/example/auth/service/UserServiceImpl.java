package com.example.auth.service;

import com.example.auth.entity.User;
import com.example.auth.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final String secretKey;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, @Value("${jwt.secret}") String secretKey) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.secretKey = secretKey;
    }

    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public String login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = Jwts.builder()
                    .setSubject(username)
                    .signWith(SignatureAlgorithm.HS512, secretKey)
                    .compact();
            System.out.println("Generated Token: " + token);
            return token;
        }
        throw new RuntimeException("Invalid credentials");
    }


}
