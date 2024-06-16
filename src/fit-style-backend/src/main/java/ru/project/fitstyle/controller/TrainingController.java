package ru.project.fitstyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ru.project.fitstyle.controller.request.training.AddEditGroupTrainingRequest;
import ru.project.fitstyle.controller.request.training.AddEditPersonalTrainingRequest;
import ru.project.fitstyle.controller.request.training.AddEditTrainingRequest;
import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.controller.response.training.AllCoachTrainingsResponse;
import ru.project.fitstyle.controller.response.training.TrainingTypesResponse;
import ru.project.fitstyle.model.entity.training.ETrainingStatus;
import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.training.PersonalTraining;
import ru.project.fitstyle.model.entity.training.TrainingType;
import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.controller.response.training.AllTrainingsResponse;
import ru.project.fitstyle.service.AuthService;
import ru.project.fitstyle.service.TrainingService;
import ru.project.fitstyle.service.UserService;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import ru.project.fitstyle.model.entity.training.ApplyTrainingStatus;

@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
@RestController
@RequestMapping("/api/training")
@PreAuthorize("hasRole('USER') || hasRole('MODERATOR') || hasRole('COACH')")
public class TrainingController {
    private final AuthService authService;
    private final UserService userService;
    private final TrainingService trainingService;

    @Autowired
    public TrainingController(final AuthService authService,
                              final UserService userService,
                              final TrainingService trainingService) {
        this.authService = authService;
        this.userService = userService;
        this.trainingService = trainingService;
    }

    /**
     * Get all user trainings
     * */
    // @GetMapping("/user")
    // public ResponseEntity<AllTrainingsResponse> getFitUserTrainings() {

    //     return ResponseEntity.ok(
    //             new AllTrainingsResponse(trainingService.getFitUserGroupTrainingsByFitUserEmail(authService.getEmail()),
    //                     trainingService.getFitUserPersonalTrainingsByFitUserEmail(authService.getEmail()))
    //     );
    // }

    /**
     * Get all coach trainings by its id
     * */
    // @PreAuthorize("hasRole('COACH')")
    // @GetMapping("/coach")
    // public ResponseEntity<AllTrainingsResponse> getCoachTrainings() {
    //     return ResponseEntity.ok(
    //             new AllTrainingsResponse(trainingService.getCoachGroupTrainingsByCoachEmail(authService.getEmail()),
    //                     trainingService.getCoachPersonalTrainingsByCoachEmail(authService.getEmail()))
    //     );
    // }

    /**
     * Get all coach trainings by its id
     * */
    // @GetMapping("/coach/{id}")
    // public ResponseEntity<AllTrainingsResponse> getCoachTrainingsById(@PathVariable("id") final Long id) {
    //     return ResponseEntity.ok(
    //             new AllTrainingsResponse(trainingService.getCoachGroupTrainingsByCoachId(id),
    //                     trainingService.getCoachPersonalTrainingsByCoachId(id))
    //     );
    // }

    /**
     * Add new training type
     * */
    @PreAuthorize("hasRole('MODERATOR')")
    @PostMapping()
    public ResponseEntity<SuccessMessage> addTrainingType(@RequestBody final AddEditTrainingRequest request) {
        trainingService.saveTraining(new TrainingType(request.getName()));
        return ResponseEntity.ok(
                new SuccessMessage("Success! Training created!")
        );
    }

    /**
     * Delete training type
     * */
    @PreAuthorize("hasRole('COACH')")
    @GetMapping("/delete/{id}")
    public ResponseEntity<SuccessMessage> deleteTrainingType(@PathVariable("id") final Long id) {
        trainingService.deleteTraining(id);
        return ResponseEntity.ok(
                new SuccessMessage("Success! Training created!")
        );
    }

    /**
     * Get all training types
     * */
    @GetMapping()
    public ResponseEntity<AllTrainingsResponse> getAllTrainings() {
        return ResponseEntity.ok(new AllTrainingsResponse(trainingService.getAllTrainings()));
    }

    /**
     * Add new group training
     * */
    @PreAuthorize("hasRole('USER') || hasRole('MODERATOR')")
    @PostMapping("/group")
    public ResponseEntity<SuccessMessage> addGroupTraining(@RequestBody final AddEditGroupTrainingRequest request) {
        FitUser currentUser = userService.getUserByEmail(authService.getEmail());
        
        GroupTraining newGroupTraining = new GroupTraining(
            new Date(),
            currentUser.getId(),
            trainingService.getTrainingById(request.getTrainingId()),
            ETrainingStatus.ACTIVE,
            ApplyTrainingStatus.POSSIBLE);

        newGroupTraining.addFitUser(currentUser); // 생성 후 사용자 추가

        trainingService.saveGroupTraining(newGroupTraining);

        return ResponseEntity.ok(
                new SuccessMessage("Success! Group training created!")
        );
    }

    /**
     * Delete group training
     * */
    // @PreAuthorize("hasRole('COACH')")
    // @GetMapping("/delete/group/{id}")
    // public ResponseEntity<SuccessMessage> deleteGroupTraining(@PathVariable("id") final Long id) {
    //     trainingService.deleteGroupTraining(id);
    //     return ResponseEntity.ok(
    //             new SuccessMessage("Success! Training created!")
    //     );
    // }

    /**
     * Sign for group training
     * */
    // @GetMapping("/sign/group/{id}")
    // public ResponseEntity<SuccessMessage> signForGroupTraining(@PathVariable("id") Long id) {
    //     trainingService.signForGroupTraining(authService.getEmail(), id);
    //     return ResponseEntity.ok(
    //             new SuccessMessage("Success! Group training created!")
    //     );
    // }

    /**
     * Add new personal training
     * */
    // @PreAuthorize("hasRole('COACH')")
    // @PostMapping("/personal")
    // public ResponseEntity<SuccessMessage> addPersonalTraining(@RequestBody final AddEditPersonalTrainingRequest request) {
    //     Calendar calendar = Calendar.getInstance();
    //     calendar.setTime(request.getDate());
    //     calendar.add(Calendar.HOUR, 1);

    //     trainingService.savePersonalTraining(new PersonalTraining(
    //             request.getDate(), calendar.getTime(), ETrainingStatus.LOGGED,
    //             userService.getUserByEmail(authService.getEmail()).getId()));
    //     return ResponseEntity.ok(
    //             new SuccessMessage("Success! Personal training created!")
    //     );
    // }


    /**
     * Sign for personal training
     * */
    // @GetMapping("/sign/personal/{id}")
    // public ResponseEntity<SuccessMessage> signForPersonalTraining(@PathVariable("id") Long id) {
    //     trainingService.signForPersonalTraining(authService.getEmail(), id);
    //     return ResponseEntity.ok(
    //             new SuccessMessage("Success! Personal training sign up!")
    //     );
    // }

    /**
     * Delete personal training
     * */
    // @PreAuthorize("hasRole('COACH')")
    // @GetMapping("/delete/personal/{id}")
    // public ResponseEntity<SuccessMessage> deletePersonalTraining(@PathVariable("id") final Long id) {
    //     trainingService.deletePersonalTraining(id);
    //     return ResponseEntity.ok(
    //             new SuccessMessage("Success! Training created!")
    //     );
    // }

    /**
     * Get all coach upcoming trainings
     * */
    // @PreAuthorize("hasRole('COACH')")
    // @GetMapping("/coach/trainings")
    // public ResponseEntity<AllCoachTrainingsResponse> getCoachUpcomingTrainings() {
    //     return ResponseEntity.ok(
    //             new AllCoachTrainingsResponse(trainingService.getAllOccupiedCoachGroupTrainings(authService.getEmail()),
    //                     trainingService.getAllOccupiedCoachPersonalTrainings(authService.getEmail()))
    //     );
    // }
}
