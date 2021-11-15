package ru.project.fitstyle.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import ru.project.fitstyle.advice.message.ErrorMessage;
import ru.project.fitstyle.exception.news.NewsException;

import java.util.Date;

@RestControllerAdvice
public class NewsControllerAdvice {
    @ExceptionHandler(value = NewsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleNewsException(NewsException ex, WebRequest request) {
        return new ErrorMessage(
                HttpStatus.BAD_REQUEST.value(),
                new Date(),
                ex.getMessage(),
                ex.getNewsErrorCode(),
                request.getDescription(false));
    }
}
