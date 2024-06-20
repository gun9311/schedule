package ru.project.fitstyle.controller.response.training;

import java.util.List;
import lombok.Getter;

import ru.project.fitstyle.model.dto.training.MyGroupTrainingDto;

@Getter
public class MyTrainingResponse {
    private final List<MyGroupTrainingDto> myGroupList;

    public MyTrainingResponse(List<MyGroupTrainingDto> myGroupList) {
        this.myGroupList = myGroupList;
    }
}