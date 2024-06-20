package ru.project.fitstyle.controller.response.training;

import ru.project.fitstyle.model.dto.training.GroupTrainingDto;
import lombok.Getter;


@Getter
public class UpdateTrainingResponse {
    private final GroupTrainingDto groupTrainingDto;


    public UpdateTrainingResponse(GroupTrainingDto groupTrainingDto) {
        this.groupTrainingDto = groupTrainingDto;
    }
}
