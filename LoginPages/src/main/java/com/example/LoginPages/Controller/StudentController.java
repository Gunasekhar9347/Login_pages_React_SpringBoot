package com.example.LoginPages.Controller;

import com.example.LoginPages.Entity.Customer;

import com.example.LoginPages.Service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;


    @PostMapping("/addCustomer")
    public ResponseEntity<?> postDetails(@Valid @RequestBody Customer customer, BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> {
                if (error.getField().equals("userName")) {
                    errors.put("userName", error.getDefaultMessage());
                } else if (error.getField().equals("emailID")) {
                    errors.put("emailID", error.getDefaultMessage());
                } else if (error.getField().equals("mobileNumber")) {
                    errors.put("mobileNumber", error.getDefaultMessage());
                } else if (error.getField().equals("password")) {
                    errors.put("password", error.getDefaultMessage());
                } else if (error.getField().equals("confirmPassword")) {
                    errors.put("confirmPassword", error.getDefaultMessage());
                } else  {
                    errors.put(error.getField(), error.getDefaultMessage());
                }
            });
            if (!errors.isEmpty()) {
                return ResponseEntity.badRequest().body(errors);
            }
        }


        try {
            Customer savedCustomer = studentService.registerCustomer(customer);
            return ResponseEntity.ok(savedCustomer);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().contains("Username")) {
                return ResponseEntity.badRequest().body(Map.of("userName", e.getMessage()));
            } else if (e.getMessage().contains("Email ID")) {
                return ResponseEntity.badRequest().body(Map.of("emailID", e.getMessage()));
            } else if (e.getMessage().contains("Mobile Number")) {
                return ResponseEntity.badRequest().body(Map.of("mobileNumber", e.getMessage()));
            } else if (e.getMessage().contains("Password")) {
                return ResponseEntity.badRequest().body(Map.of("password", e.getMessage()));
            } else if (e.getMessage().contains("Confirm Password")) {
                return ResponseEntity.badRequest().body(Map.of("confirmPassword", e.getMessage()));
            }
            throw e; // let other errors bubble up
        }
    }}

