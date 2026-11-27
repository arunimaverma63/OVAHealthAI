package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.User;
import com.example.OVAHealthAI.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder encoder;

//    public User register(User user){
//        user.setPassword(encoder.encode(user.getPassword()));
//
//        return userRepo.save(user);
//    }
//
    public User register(User user){
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists. Please choose a different username.");
    }
    user.setPassword(encoder.encode(user.getPassword()));
    return userRepo.save(user);
}
}
