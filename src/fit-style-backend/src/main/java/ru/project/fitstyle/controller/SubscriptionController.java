package ru.project.fitstyle.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.project.fitstyle.controller.request.subscription.AddSubscriptionTypeRequest;
import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.controller.response.subscription.CheckApplyResponse;
import ru.project.fitstyle.controller.response.subscription.SubscriptionTypeResponse;
import ru.project.fitstyle.service.SubscriptionService;
import ru.project.fitstyle.service.AuthService;
import ru.project.fitstyle.service.UserService;


@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
@RestController
@RequestMapping("/api/subscription-type")
@PreAuthorize("hasRole('MODERATOR')")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final AuthService authService;
    private final UserService userService;

    public SubscriptionController(final SubscriptionService subscriptionService, final AuthService authService,
                                    final UserService userService) {
        this.subscriptionService = subscriptionService;
        this.authService = authService;
        this.userService = userService;
    }

    /**
     * Return all subscription types
     * */
    @GetMapping()
    public ResponseEntity<CheckApplyResponse> checkApplyById() {
        Long userId = userService.getUserByEmail(authService.getEmail()).getId();
        return ResponseEntity.ok(new CheckApplyResponse(subscriptionService.checkApplyById(userId)));
    }

    // @PostMapping()
    // public ResponseEntity<SuccessMessage> add(@RequestBody AddSubscriptionTypeRequest request) {
    //     SubscriptionType subscriptionType =
    //             new SubscriptionType(request.getName(), request.getValidityMonths(), request.getPlacementTime(), request.getCost());
    //     subscriptionTypeService.save(subscriptionType);
    //     return ResponseEntity.ok(new SuccessMessage("Subscription type successfully added!"));
    // }
}
