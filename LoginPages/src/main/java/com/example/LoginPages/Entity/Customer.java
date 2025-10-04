package com.example.LoginPages.Entity;

import com.example.LoginPages.Validation.PasswordMatches;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name = "Customer_DB_New",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "User_Name"),
        @UniqueConstraint(columnNames = "Email_ID"),
        @UniqueConstraint(columnNames = "Mobile_Number")
}
)
@NoArgsConstructor
@AllArgsConstructor
@PasswordMatches
public class Customer {

    @Id
    @Column(name = "ID")
    @GeneratedValue
    private int id;

    @Column(name="User_Name", nullable = false, unique = true)
    @NotBlank(message = "UserName is Mandatory")
    @Size(min = 3, max = 30, message = "Must be between 3 to 30")
    private String userName;

    @Column(name = "Mobile_Number", nullable = false, unique = true)
    @NotNull(message = "Mobile number is mandatory")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Mobile number must be 10 - 15 digits")
    private String mobileNumber;

    @NotBlank(message =  "Email is mandatory")
    @Email(message = "Email Must be valid")
    @Column(name = "Email_ID", nullable = false, unique = true)
    private String emailID;


    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, max = 15)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&*]).{8,15}$", message = "Password must contain upper, lower, digit & special char")
    @Column(name = "Password", nullable = false)
    private String password;

//    @Transient
    @NotBlank(message = "Password Must be Same")
    private String confirmPassword;

//    public boolean isPasswordMatch() {
//        return password != null && password.equals(confirmPassword);
//    }

}
