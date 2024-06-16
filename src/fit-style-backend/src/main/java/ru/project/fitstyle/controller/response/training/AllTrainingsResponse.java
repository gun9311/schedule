package ru.project.fitstyle.controller.response.training;

import ru.project.fitstyle.model.dto.training.GroupTrainingDto;
import ru.project.fitstyle.model.dto.training.PersonalTrainingDto;

import java.util.List;

public class AllTrainingsResponse {
    private final List<GroupTrainingDto> groupTrainingDtos;


    public AllTrainingsResponse(List<GroupTrainingDto> groupTrainingDtos) {
        this.groupTrainingDtos = groupTrainingDtos;
    }

    public List<GroupTrainingDto> getGroupTrainings() {
        return groupTrainingDtos;
    }
}
