package ru.project.fitstyle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.project.fitstyle.model.dto.training.PersonalTrainingDto;
import ru.project.fitstyle.model.entity.training.PersonalTraining;

import java.util.List;

@Repository
public interface PersonalTrainingRepository extends JpaRepository<PersonalTraining, Long> {
    @Query("select new ru.project.fitstyle.model.dto.training.PersonalTrainingDto(v.id, v.startDate, v.endDate, v.status, w.id, w.name) " +
            "from PersonalTraining v inner join FitUser w on (v.coachId=w.id) " +
            "where w.id = :id")
    List<PersonalTrainingDto> findAllCoachTrainingsWithCoachId(@Param("id") final Long id);

    @Query("select new ru.project.fitstyle.model.dto.training.PersonalTrainingDto(v.id, v.startDate, v.endDate, v.status, w.id, w.name) " +
            "from PersonalTraining v inner join FitUser w on (v.coachId=w.id) " +
            "where w.email = :email")
    List<PersonalTrainingDto> findAllCoachTrainingsWithCoachEmail(@Param("email") final String email);

    @Query("select new ru.project.fitstyle.model.dto.training.PersonalTrainingDto(v.id, v.startDate, v.endDate, v.status, t.id, t.name) " +
            "from PersonalTraining v inner join FitUser t on (v.coachId=t.id) " +
            "where v.fitUser.email=:email")
    List<PersonalTrainingDto> findAllFitUserTrainingsWithFitUserEmail(@Param("email") final String email);

    @Query("select v " +
            "from PersonalTraining v inner join v.fitUser w inner join FitUser t on v.coachId=t.id " +
            "where t.email=:email")
    List<PersonalTraining> findAllOccupiedCoachTrainingsWithCoachEmail(@Param ("email") String email);
}
