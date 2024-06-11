package ru.project.fitstyle.model.dto.user;

import java.util.List;

public class FitUserFullInfoDto {
    private final FitUserDto fitUserInfo;

    private final List<RoleDto> roles;

    public FitUserFullInfoDto(FitUserDto fitUserInfo, List<RoleDto> roles) {
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
