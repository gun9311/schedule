package ru.project.fitstyle.controller.response.schedule;

import java.util.List;

import lombok.Getter;
import ru.project.fitstyle.model.dto.schedule.ScheduleDto;

@Getter
public class ScheduleResponse {

    private final List<ScheduleDto> scheduleDtos;

    public ScheduleResponse(final List<ScheduleDto> scheduleDtos) {
        this.scheduleDtos = scheduleDtos;
    }
}
