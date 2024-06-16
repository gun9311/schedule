package ru.project.fitstyle.model.dto.subscription;

import lombok.Getter;

@Getter
public class ApplyGroupDto {

    private final Long groupTrainingId;

    public ApplyGroupDto(final Long groupTrainingId){
        this.groupTrainingId = groupTrainingId;
    }

}
