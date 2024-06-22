package ru.project.fitstyle.controller;

import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.controller.response.subscription.CheckApplyResponse;
import ru.project.fitstyle.controller.response.subscription.GetApplyResponse;
import ru.project.fitstyle.model.entity.subscription.Subscription;
import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.service.SubscriptionService;
import ru.project.fitstyle.service.TrainingService;
import ru.project.fitstyle.service.AuthService;
import ru.project.fitstyle.service.UserService;


@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
@RestController
@RequestMapping("/api/subscription")
@PreAuthorize("hasRole('MODERATOR') || hasRole('USER')")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final TrainingService trainingService;
    private final AuthService authService;
    private final UserService userService;

    public SubscriptionController(final SubscriptionService subscriptionService, final TrainingService trainingService,
                                final AuthService authService, final UserService userService) {
        this.subscriptionService = subscriptionService;
        this.trainingService = trainingService;
        this.authService = authService;
        this.userService = userService;
    }


    
    @PostMapping("/apply/{id}")
    public ResponseEntity<SuccessMessage> applyTraining(@PathVariable("id") final Long id) {
        FitUser fitUser = userService.getUserByEmail(authService.getEmail());
        GroupTraining group = trainingService.getGroupTrainingById(id);
        subscriptionService.save(new Subscription(fitUser, group, new Date()));
        return ResponseEntity.ok(new SuccessMessage("신청 완료!"));
    }


    @GetMapping("/group/{id}")
    public ResponseEntity<GetApplyResponse> getApplyUser(@PathVariable("id") final Long id) {
        return ResponseEntity.ok(new GetApplyResponse(subscriptionService.getApplyUser(id)));
    }

    /**
     * Return all subscription types
     * */
    @GetMapping("/check")
    public ResponseEntity<CheckApplyResponse> checkApplyById() {
        Long userId = userService.getUserByEmail(authService.getEmail()).getId();
        return ResponseEntity.ok(new CheckApplyResponse(subscriptionService.checkApplyById(userId)));
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<SuccessMessage> acceptApply(@PathVariable("id") final Long id) {
        subscriptionService.acceptApply(id);
        return ResponseEntity.ok(new SuccessMessage("수락 완료"));
    }

    @PostMapping("/refuse/{id}")
    public ResponseEntity<SuccessMessage> refuseApply(@PathVariable("id") final Long id) {
        subscriptionService.deleteById(id);
        return ResponseEntity.ok(new SuccessMessage("거절 완료"));
    }

    // @PostMapping()
    // public ResponseEntity<SuccessMessage> add(@RequestBody AddSubscriptionTypeRequest request) {
    //     SubscriptionType subscriptionType =
    //             new SubscriptionType(request.getName(), request.getValidityMonths(), request.getPlacementTime(), request.getCost());
    //     subscriptionTypeService.save(subscriptionType);
    //     return ResponseEntity.ok(new SuccessMessage("Subscription type successfully added!"));
    // }
}
