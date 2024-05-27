package com.example.auth.service;

import com.example.auth.entity.User;

public interface UserService {
    User register(User user);
    String login(String username, String password);
}
