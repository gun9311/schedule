package ru.project.fitstyle.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ru.project.fitstyle.controller.request.user.SaveFirebasetokenRequest;
import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.model.entity.user.FirebaseToken;
import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.service.AuthService;
import ru.project.fitstyle.service.UserService;
import ru.project.fitstyle.service.impl.token.FirebaseTokenService;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/firebase")

public class FirebaseController {

    private final FirebaseTokenService firebaseTokenService;
    private final UserService userService;
    private final AuthService authService;

    public FirebaseController(final FirebaseTokenService firebaseTokenService, final UserService userService,
                            final AuthService authService) {
        this.firebaseTokenService = firebaseTokenService;
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping()
    public ResponseEntity<SuccessMessage> saveToken(@RequestBody SaveFirebasetokenRequest request) {
        FitUser fitUser = userService.getUserByEmail(authService.getEmail());
        FirebaseToken firebaseToken = new FirebaseToken(request.getToken(), fitUser);
        firebaseTokenService.saveToken(firebaseToken);

        return ResponseEntity.ok(
                new SuccessMessage("FirebaseToken saved successfully!"));
    }
    

}
