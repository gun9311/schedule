package ru.project.fitstyle.model.dto.training;

import ru.project.fitstyle.model.dto.user.FitUserFullNameDto;
import ru.project.fitstyle.model.entity.training.ETrainingStatus;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.project.fitstyle.model.entity.training.ApplyTrainingStatus;


@Getter
@AllArgsConstructor
public class GroupTrainingDto {
    private final Long id;

    private final Date startDate;

    private final String title;
    
    private final String description;
    
    private final Long coachId;
    
    private final String coachName;

    private final String trainingName;

    private final ETrainingStatus status;

    private final ApplyTrainingStatus apply;

    private final int numberOfUsers;
}
