package ru.project.fitstyle.controller.response.profile;

import ru.project.fitstyle.model.dto.user.FitUserDto;
import ru.project.fitstyle.model.dto.user.RoleDto;
import ru.project.fitstyle.model.dto.user.SubscriptionDto;

import java.util.List;

public class UserProfileResponse {

    private final FitUserDto fitUserInfo;

    private final List<RoleDto> roles;

    public UserProfileResponse(FitUserDto fitUserInfo, List<RoleDto> roles) {
        this.fitUserInfo = fitUserInfo;
        this.roles = roles;
    }

    public FitUserDto getFitUserInfo() {
        return fitUserInfo;
    }

    public List<RoleDto> getRoles() {
        return roles;
    }
}
