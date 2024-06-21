package ru.project.fitstyle.model.dto.subscription;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SubscriptionDto {

    private Long id;

    private Date applyDate;
    
    private String userName;
    
    private String email;
    
    private String imgURL;

}
