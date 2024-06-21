package ru.project.fitstyle.model.dto.schedule;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ScheduleDto {

    private Long id;
    
    private String location;
    
    private Date startTime;

    private Date endTime;
    
    private String userName;
}