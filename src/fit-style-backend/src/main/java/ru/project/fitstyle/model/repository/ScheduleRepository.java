package ru.project.fitstyle.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ru.project.fitstyle.model.dto.schedule.ScheduleDto;
import ru.project.fitstyle.model.entity.schedule.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{

    @Query("select new ru.project.fitstyle.model.dto.schedule.ScheduleDto(v.id, v.location, v.description, v.startTime, v.endTime, v.fitUser.name) " +
            "from Schedule v " +
            "where v.groupTraining.id = :id")
    List<ScheduleDto> getScheduleByGroupId(@Param("id") final Long id);

}
