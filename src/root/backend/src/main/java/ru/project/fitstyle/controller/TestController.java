package ru.project.fitstyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.project.fitstyle.exception.refresh.ERefreshTokenError;
import ru.project.fitstyle.exception.refresh.RefreshTokenException;
import ru.project.fitstyle.model.user.FitUser;
import ru.project.fitstyle.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
    @Autowired
    UserRepository userRepository;
    @GetMapping("/all")
    public String allAccess() {
        return "Public content.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('COACH')")
    public String userAccess() {
        return "Добро пожаловать, ";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('COACH')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/exception_check")
    public void exceptionCheck() {
        throw new RefreshTokenException("f3tdrgsdfgsd", ERefreshTokenError.NOT_FOUND);
    }

    @GetMapping("/get_dicks")
    public ResponseEntity<?> getDO() {
        long id = 1;
        FitUser user = userRepository.getById(id);
        return ResponseEntity.ok(user);
    }
}
