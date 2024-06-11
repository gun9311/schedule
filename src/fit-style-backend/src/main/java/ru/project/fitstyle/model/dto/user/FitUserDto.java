package ru.project.fitstyle.model.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FitUserDto {
    private final Long id;

    private final String email;

    private final String name;

    private final String gender;

    private final String imgURL;
    
    private final String phoneNumber;

    private final Boolean isEnabled;

    public Boolean getEnabled() {
        return isEnabled;
    }
}
