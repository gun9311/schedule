package ru.project.fitstyle.controller;

import java.util.Date;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ru.project.fitstyle.controller.request.news.AddEditNewsRequest;
import ru.project.fitstyle.controller.request.schedule.AddScheduleRequest;
import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.controller.response.schedule.ScheduleResponse;
import ru.project.fitstyle.controller.response.subscription.GetApplyResponse;
import ru.project.fitstyle.model.entity.news.News;
import ru.project.fitstyle.model.entity.schedule.Schedule;
import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.service.ScheduleService;
import ru.project.fitstyle.service.TrainingService;
import ru.project.fitstyle.service.AuthService;
import ru.project.fitstyle.service.UserService;


@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
@RestController
@RequestMapping("/api/schedule")
@PreAuthorize("hasRole('MODERATOR') || hasRole('USER')")
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final AuthService authService;
    private final UserService userService;
    private final TrainingService trainingService;

    public ScheduleController(final ScheduleService scheduleService, final AuthService authService,
                            final UserService userService, final TrainingService trainingService) {
        this.scheduleService = scheduleService;
        this.authService = authService;
        this.userService = userService;
        this.trainingService = trainingService;

    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('MODERATOR') || hasRole('USER')")
    public ResponseEntity<SuccessMessage> addSchedule(@RequestBody final AddScheduleRequest request) {
        FitUser fitUser = userService.getUserByEmail(authService.getEmail());
        GroupTraining groupTraining = trainingService.getGroupTrainingById(request.getGroupId());
        Schedule newSchedule = new Schedule(request.getLocation(), request.getDescription(), new Date(request.getSt()), new Date(request.getEt()), fitUser, groupTraining);
        scheduleService.save(newSchedule);
        return ResponseEntity.ok(
                new SuccessMessage("Success! Schedule created!")
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponse> getScheduleByGroupId(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(new ScheduleResponse(scheduleService.getScheduleByGroupId(id)));
    }

}