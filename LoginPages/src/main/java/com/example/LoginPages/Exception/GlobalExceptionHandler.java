package com.example.LoginPages.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, String> error = new HashMap<>();
        if (ex.getMessage().contains("Username")) {
            error.put("userName", ex.getMessage());
        } else if (ex.getMessage().contains("Email")) {
            error.put("emailID", ex.getMessage());
        } else if (ex.getMessage().contains("Mobile")) {
            error.put("mobileNumber", ex.getMessage());
        } else if (ex.getMessage().contains("Password")) {
            error.put("password", ex.getMessage());
        } else if (ex.getMessage().contains("ConfirmPassword")) {
            error.put("confirmPassword", ex.getMessage());
        }else {
            error.put("error", ex.getMessage());
        }

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}