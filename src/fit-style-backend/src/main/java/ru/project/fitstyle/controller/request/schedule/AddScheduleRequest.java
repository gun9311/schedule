package ru.project.fitstyle.controller.request.schedule;

import lombok.Getter;

@Getter
public class AddScheduleRequest {

    private Long groupId;

    private String location;

    private String st;

    private String et;
    
    private String description;
}
