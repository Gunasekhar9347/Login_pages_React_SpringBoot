package com.example.LoginPages.Service;

import com.example.LoginPages.Entity.Customer;
import com.example.LoginPages.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepo  studentRepo;

    public Customer registerCustomer(Customer customer) {
        if (studentRepo.existsByUserName(customer.getUserName())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (studentRepo.existsByEmailID(customer.getEmailID())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (studentRepo.existsByMobileNumber(customer.getMobileNumber())) {
            throw new IllegalArgumentException("Mobile number already exists");
        }

        return studentRepo.save(customer);
    }
}

//    public Customer saveDetails(Customer customer){
//        return studentRepo.save(customer);
//
//    }
//}