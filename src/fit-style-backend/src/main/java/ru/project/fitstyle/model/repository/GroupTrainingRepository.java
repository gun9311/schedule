package ru.project.fitstyle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ru.project.fitstyle.model.dto.training.GroupTrainingDto;
import ru.project.fitstyle.model.dto.training.MyGroupTrainingDto;
import ru.project.fitstyle.model.entity.training.GroupTraining;

import java.util.List;

import ru.project.fitstyle.model.dto.user.FitUserDto;
import ru.project.fitstyle.model.entity.user.FitUser;

@Repository
public interface GroupTrainingRepository extends JpaRepository<GroupTraining, Long> {

    @Query("select new ru.project.fitstyle.model.dto.training.GroupTrainingDto(v.id, v.startDate, v.title, v.description, w.id, w.name, v.trainingType.name, v.status, v.applyStatus, size(v.fitUsers)) " +
       "from GroupTraining v inner join FitUser w on (v.coachId=w.id)" +
       "where v.id = :id")
    GroupTrainingDto getTrainingById(@Param("id") final Long id);   

    @Query("select new ru.project.fitstyle.model.dto.training.GroupTrainingDto(v.id, v.startDate, v.title, v.description, w.id, w.name, v.trainingType.name, v.status, v.applyStatus, size(v.fitUsers)) " +
           "from GroupTraining v inner join FitUser w on (v.coachId=w.id)")
    List<GroupTrainingDto> getAllTrainings();

    @Query("select new ru.project.fitstyle.model.dto.training.MyGroupTrainingDto(v.id, v.startDate, v.title, v.description, w.id, w.name, v.trainingType.name, v.status, size(v.fitUsers)) " +
           "from GroupTraining v inner join FitUser w on (v.coachId=w.id)" +
           "where :fitUser member of v.fitUsers")
    List<MyGroupTrainingDto> getMyTrainings(@Param("fitUser") final FitUser fitUser);

    @Query("select new ru.project.fitstyle.model.dto.user.FitUserDto(v.id, v.email, v.name, v.gender, v.imgURL, v.phoneNumber, v.isEnabled) " +
           "from GroupTraining g join g.fitUsers v " +
           "where g.id= :id")
    List<FitUserDto> getGroupMember(@Param("id") final Long id);

//     @Query("select w.name) " +
//            "from GroupTraining v inner join FitUser w on (v.coachId=w.id)" +
//            "where v.id = :id")
//     String getCoachName(@Param("id") final Long id);

//     @Query("select new ru.project.fitstyle.model.dto.training.GroupTrainingDto(v.id, v.startDate, v.endDate, v.status, w.id, w.name, v.trainingType.name, size(v.fitUsers)) " +
//             "from GroupTraining v inner join FitUser w on (v.coachId=w.id) " +
//             "where w.id = :id")
//     List<GroupTrainingDto> findAllCoachTrainingsWithCoachId(@Param("id") final Long id);

//     @Query("select new ru.project.fitstyle.model.dto.training.GroupTrainingDto(v.id, v.startDate, v.endDate, v.status, w.id, w.name, v.trainingType.name, size(v.fitUsers)) " +
//             "from GroupTraining v inner join FitUser w on (v.coachId=w.id) " +
//             "where w.email = :email")
//     List<GroupTrainingDto> findAllCoachTrainingsWithCoachEmail(@Param("email") final String email);

//     @Query("select new ru.project.fitstyle.model.dto.training.GroupTrainingDto(v.id, v.startDate, v.endDate, v.status, t.id, t.name, v.trainingType.name, size(v.fitUsers)) " +
//             "from GroupTraining v inner join v.fitUsers w inner join FitUser t on (v.coachId=t.id) " +
//             "where w.email=:email")
//     List<GroupTrainingDto> findAllFitUserTrainingsWithFitUserEmail(@Param("email") final String email);

//     @Query("select distinct v " +
//             "from GroupTraining v inner join v.fitUsers w inner join FitUser t on v.coachId=t.id " +
//             "where t.email=:email")
//     List<GroupTraining> findAllOccupiedCoachTrainingsWithCoachEmail(@Param("email") String email);
}
