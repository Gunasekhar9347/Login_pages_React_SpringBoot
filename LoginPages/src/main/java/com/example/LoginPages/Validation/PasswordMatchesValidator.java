package com.example.LoginPages.Validation;

import com.example.LoginPages.Entity.Customer;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Customer> {

    @Override
    public boolean isValid(Customer customer, ConstraintValidatorContext context) {
        if (customer.getPassword() == null || customer.getConfirmPassword() == null) {
            return true; // @NotBlank will handle null/empty separately
        }

        boolean matches = customer.getPassword().equals(customer.getConfirmPassword());

        if (!matches) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Passwords do not match")
                    .addPropertyNode("confirmPassword") // attach error to confirmPassword field
                    .addConstraintViolation();
        }
        return matches;
    }
}