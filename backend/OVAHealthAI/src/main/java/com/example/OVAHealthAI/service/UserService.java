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

    public User register(User user){
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepo.save(user);
    }

}
