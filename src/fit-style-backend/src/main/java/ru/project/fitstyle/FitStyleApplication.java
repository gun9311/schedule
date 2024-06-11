package ru.project.fitstyle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FitStyleApplication {
    public static void main(String[] args) {
        SpringApplication.run(FitStyleApplication.class, args);
    }
}


