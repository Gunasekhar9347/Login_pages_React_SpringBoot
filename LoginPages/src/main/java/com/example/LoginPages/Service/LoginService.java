package com.example.LoginPages.Service;

import com.example.LoginPages.Entity.Customer;
import com.example.LoginPages.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer validateUser(String username, String password) {
        return customerRepository.findByUserName(username)
                .filter(user -> user.getPassword().equals(password)) // simple plaintext check; for production, use hashed passwords
                .orElse(null);
    }
}
