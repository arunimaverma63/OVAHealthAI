package com.example.OVAHealthAI.controller;

import com.example.OVAHealthAI.entity.User;
import com.example.OVAHealthAI.service.JwtService;
import com.example.OVAHealthAI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        try{
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );

            if(authentication.isAuthenticated()){
                String token = jwtService.generateToken(
                        user.getUsername()
                );
                return ResponseEntity.ok(token);
            }
        }catch (Exception e) {
            // This will print the exact error in your IDE console
            System.out.println("DEBUG - Authentication failed for user: " + user.getUsername());
            System.out.println("DEBUG - Error Type: " + e.getClass().getSimpleName());
            System.out.println("DEBUG - Error Message: " + e.getMessage());

            // This will send the error message back to Postman instead of a generic 403
            return ResponseEntity.status(401).body("Login Failed: " + e.getMessage());
        }

        return ResponseEntity.badRequest().build();
    }
}
