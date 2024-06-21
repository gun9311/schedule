package ru.project.fitstyle.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import ru.project.fitstyle.model.dto.schedule.ScheduleDto;
import ru.project.fitstyle.model.entity.schedule.Schedule;
import ru.project.fitstyle.model.repository.ScheduleRepository;
import ru.project.fitstyle.service.ScheduleService;

@Service
public class FitScheduleService implements ScheduleService{
    private final ScheduleRepository scheduleRepository;


    public FitScheduleService(final ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public void save(Schedule schedule){
        scheduleRepository.save(schedule);
    }

    @Override
    public List<ScheduleDto> getScheduleByGroupId(Long id){
        return scheduleRepository.getScheduleByGroupId(id);
    }

}
