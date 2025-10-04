package com.example.LoginPages.Repository;

import com.example.LoginPages.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByUserName(String userName);
}