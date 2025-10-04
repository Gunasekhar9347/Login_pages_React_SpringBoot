package com.example.LoginPages.Controller;

import com.example.LoginPages.Entity.Customer;
import com.example.LoginPages.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        if (username == null || username.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("username", "Username is required"));
        }
        if (password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("password", "Password is required"));
        }

        Customer user = loginService.validateUser(username, password);

        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("general", "Invalid username or password"));
        }

        // login successful
        return ResponseEntity.ok(Map.of("message", "Login successful", "username", user.getUserName()));
    }
}