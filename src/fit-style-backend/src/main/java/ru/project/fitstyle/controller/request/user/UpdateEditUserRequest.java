package ru.project.fitstyle.controller.request.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEditUserRequest {
    @NotBlank(message = "name should not be blank")
    @Size(min = 2, max = 20, message = "name should be more or equal than 2 and less or equal than 20 characters")
    private String name;

    @Size(max = 5000, message = "age should be more or equal than 1 and less or equal than 3 characters")
    private String imgURL;

    @Size(max = 6, message = "gender should be more or equal than 1 and less or equal than 6 characters")
    private String gender;

    @Size(max = 20, message = "telephone should be more or equal than 5 and less or equal than 20 characters")
    private String phoneNumber;
}
