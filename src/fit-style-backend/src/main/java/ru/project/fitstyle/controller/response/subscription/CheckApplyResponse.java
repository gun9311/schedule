package ru.project.fitstyle.controller.response.subscription;
import lombok.Getter;
import ru.project.fitstyle.model.dto.subscription.ApplyGroupDto;

import java.util.List;

@Getter
public class CheckApplyResponse {

    private List<ApplyGroupDto> applyGroupList;

    public CheckApplyResponse(List<ApplyGroupDto> applyGroupList) {
        this.applyGroupList = applyGroupList;
    }

}
