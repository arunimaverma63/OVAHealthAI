package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.User;
import com.example.OVAHealthAI.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService { //It loads the user from the database using UserRepo

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {

        // Change from:
// User user = userRepo.findByUsername(username)...

// To:
        User user = userRepo.findFirstByUsernameOrderByIdenDesc(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));


        return org.springframework.security.core.userdetails.User
                .builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .build();

    }
}
