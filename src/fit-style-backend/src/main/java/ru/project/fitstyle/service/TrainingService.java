package ru.project.fitstyle.service;

import ru.project.fitstyle.model.dto.training.*;
import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.training.PersonalTraining;
import ru.project.fitstyle.model.entity.training.TrainingType;
import ru.project.fitstyle.model.entity.user.FitUser;

import java.util.List;

import ru.project.fitstyle.model.dto.user.FitUserDto;

public interface TrainingService {

    void saveTraining(final TrainingType trainingType);

    void saveGroupTraining(final GroupTraining groupTraining);

    List<FitUserDto> getGroupMember(final Long id);
    
    GroupTraining findById(final Long id);
    
    GroupTrainingDto getTrainingById(final Long id);

    // String getCoachName(final Long id);

    // void savePersonalTraining(final PersonalTraining personalTraining);

    // void signForPersonalTraining(final String userEmail, final Long trainingId);

    // void signForGroupTraining(final String userEmail, final Long trainingId);

    void deleteTraining(final Long id);

    // void deleteGroupTraining(final Long id);

    // void deletePersonalTraining(final Long id);

    GroupTraining getGroupTrainingById(final Long id);

    // PersonalTraining getPersonalTrainingById(final Long id);

    TrainingType getTrainingTypeById(final Long id);

    TrainingType getTrainingTypeByName(final String trainingName);

    List<GroupTrainingDto> getAllTrainings();
    
    List<MyGroupTrainingDto> getMyTrainings(final FitUser fitUser);

    // List<GroupTrainingDto> getCoachGroupTrainingsByCoachId(final Long id);

    // List<PersonalTrainingDto> getCoachPersonalTrainingsByCoachId(final Long id);

    // List<GroupTrainingDto> getCoachGroupTrainingsByCoachEmail(final String email);

    // List<PersonalTrainingDto> getCoachPersonalTrainingsByCoachEmail(final String email);

    // List<GroupTrainingDto> getFitUserGroupTrainingsByFitUserEmail(final String email);

    // List<PersonalTrainingDto> getFitUserPersonalTrainingsByFitUserEmail(final String email);

    // List<GroupTrainingWithUsersDto> getAllOccupiedCoachGroupTrainings(final String email);

    // List<PersonalTrainingWithUsersDto> getAllOccupiedCoachPersonalTrainings(final String email);

    List<TrainingTypeDto> getTrainingNames();
}
