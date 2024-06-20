package ru.project.fitstyle.controller.request.training;

import lombok.Getter;
import lombok.Setter;
import ru.project.fitstyle.model.entity.training.ApplyTrainingStatus;
import ru.project.fitstyle.model.entity.training.ETrainingStatus;

@Getter
@Setter
public class UpdateEditGroupTrainingRequest {

    private Long coachId;
    
    private String title;
    
    private String description;
    
    private String trainingName;

    private ETrainingStatus status;
    
    private ApplyTrainingStatus apply;

}
