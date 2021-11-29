package ru.project.fitstyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.project.fitstyle.model.dto.user.FitUser;
import ru.project.fitstyle.payload.response.training.TrainingsResponse;
import ru.project.fitstyle.service.auth.AuthService;
import ru.project.fitstyle.service.user.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/training")
@PreAuthorize("hasRole('USER')")
public class TrainingController {
    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public TrainingController(@Qualifier("fitAuthService") AuthService authService,
                              @Qualifier("fitUserService") UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<TrainingsResponse> getFitUserTrainings() {
        FitUser fitUser = userService.getUserByEmail(authService.getEmail());
        return ResponseEntity.ok(
                new TrainingsResponse(fitUser.getGroupTrainings(), fitUser.getPersonalTrainings())
        );
    }
}
