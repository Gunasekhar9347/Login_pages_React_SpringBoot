package com.example.LoginPages.Repository;

import com.example.LoginPages.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Customer, Integer> {
    boolean existsByEmailID(String emailID);
    boolean existsByUserName(String userName);
    boolean existsByMobileNumber(String mobileNumber);

}
