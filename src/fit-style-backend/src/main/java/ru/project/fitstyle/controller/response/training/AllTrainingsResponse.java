package ru.project.fitstyle.controller.response.training;

import ru.project.fitstyle.model.dto.training.GroupTrainingDto;

import java.util.List;
import lombok.Getter;

@Getter
public class AllTrainingsResponse {
    private final List<GroupTrainingDto> groupTrainingDtos;


    public AllTrainingsResponse(List<GroupTrainingDto> groupTrainingDtos) {
        this.groupTrainingDtos = groupTrainingDtos;
    }
}
