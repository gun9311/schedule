package ru.project.fitstyle.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import ru.project.fitstyle.service.impl.firebase.FcmService;
import ru.project.fitstyle.service.impl.token.FirebaseTokenService;


@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
@RestController
@RequestMapping("/api/schedule")
@PreAuthorize("hasRole('MODERATOR') || hasRole('USER')")
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final AuthService authService;
    private final UserService userService;
    private final TrainingService trainingService;
    private final FirebaseTokenService firebaseTokenService;
    private final FcmService fcmService;
    

    public ScheduleController(final ScheduleService scheduleService, final AuthService authService,
                            final UserService userService, final TrainingService trainingService,
                            final FirebaseTokenService firebaseTokenService, final FcmService fcmService) {
        this.scheduleService = scheduleService;
        this.authService = authService;
        this.userService = userService;
        this.trainingService = trainingService;
        this.firebaseTokenService = firebaseTokenService;
        this.fcmService = fcmService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('MODERATOR') || hasRole('USER')")
    public ResponseEntity<SuccessMessage> addSchedule(@RequestBody final AddScheduleRequest request) {
        FitUser fitUser = userService.getUserByEmail(authService.getEmail());
        GroupTraining groupTraining = trainingService.getGroupTrainingById(request.getGroupId());
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime startDateTime = LocalDateTime.parse(request.getSt(), formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(request.getEt(), formatter);

        Schedule newSchedule = new Schedule(request.getLocation(), request.getDescription(), 
            Date.from(startDateTime.atZone(ZoneId.systemDefault()).toInstant()), 
            Date.from(endDateTime.atZone(ZoneId.systemDefault()).toInstant()), 
            fitUser, groupTraining);

        scheduleService.save(newSchedule);


        String title = "일정";
        String body = String.format("%s 일정이 추가되었습니다.", groupTraining.getTitle());

        List<String> fcmTokens = new ArrayList<>();
        List<FitUser> fitUsers = groupTraining.getFitUsers();

        for (FitUser fitUser2 : fitUsers) {
            Long fitUserId = fitUser2.getId();
            String fcmToken = firebaseTokenService.getTokenByUserId(fitUserId);
            if (fcmToken != null && !fcmToken.isEmpty()) {
                fcmTokens.add(fcmToken);
            }
        }
        
        if (fcmTokens.isEmpty()) {
            for (String fcmToken2 : fcmTokens) {
                fcmService.sendNotification(fcmToken2, title, body); 
            }
        }
        
        return ResponseEntity.ok(
                new SuccessMessage("Success! Schedule created!")
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponse> getScheduleByGroupId(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(new ScheduleResponse(scheduleService.getScheduleByGroupId(id)));
    }
}
