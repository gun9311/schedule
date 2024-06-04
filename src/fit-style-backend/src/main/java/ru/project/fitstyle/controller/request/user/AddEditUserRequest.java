package ru.project.fitstyle.controller.request.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddEditUserRequest {
    @NotBlank(message = "name should not be blank")
    @Size(min = 2, max = 20, message = "name should be more or equal than 2 and less or equal than 20 characters")
    private String name;

    @NotBlank(message = "email should not be blank")
    @Size(min = 5, max = 50, message = "email should be more or equal than 5 and less or equal than 50 characters")
    @Email(message = "email should have syntax like: email@email.com")
    private String email;

    @NotBlank(message = "password should not be blank")
    @Size(min = 6, max = 120, message = "password should be more or equal than 6 and less or equal than 120 characters")
    private String password;

    @Size(max = 5000, message = "age should be more or equal than 1 and less or equal than 3 characters")
    private String imgURL;

    @Size(max = 6, message = "gender should be more or equal than 1 and less or equal than 6 characters")
    private String gender;

    @Size(max = 20, message = "telephone should be more or equal than 5 and less or equal than 20 characters")
    private String phoneNumber;

}
