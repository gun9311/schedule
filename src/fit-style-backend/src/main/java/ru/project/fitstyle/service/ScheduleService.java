package ru.project.fitstyle.service;

import java.util.List;

import ru.project.fitstyle.model.dto.schedule.ScheduleDto;
import ru.project.fitstyle.model.entity.schedule.Schedule;

public interface ScheduleService {

    public void save(Schedule schedule);

    public List<ScheduleDto> getScheduleByGroupId(Long id);
}
