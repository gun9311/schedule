package ru.project.fitstyle.controller.request.training;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AddEditGroupTrainingRequest {

    private String title;
    
    private String description;
    
    private Long trainingId;

}
