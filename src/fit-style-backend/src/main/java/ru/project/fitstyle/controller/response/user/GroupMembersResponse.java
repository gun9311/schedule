package ru.project.fitstyle.controller.response.user;

import java.util.List;

import lombok.Getter;
import ru.project.fitstyle.model.dto.user.FitUserDto;

@Getter
public class GroupMembersResponse {

    private final List<FitUserDto> groupUsers;

    public GroupMembersResponse(final List<FitUserDto> groupUsers) {
        this.groupUsers = groupUsers;
    }
}
