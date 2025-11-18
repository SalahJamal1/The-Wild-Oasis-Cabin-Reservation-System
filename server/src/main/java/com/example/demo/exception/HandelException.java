package com.example.demo.exception;

import com.example.demo.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
@RequiredArgsConstructor
public class HandelException {
    private final Helper helper;

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDetails> handleException(RuntimeException e) {

        ErrorDetails error = ErrorDetails.builder()
                .status(HttpStatus.NOT_FOUND.name())
                .message(e.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleException(Exception e) {

        ErrorDetails error = ErrorDetails.builder()
                .status(HttpStatus.BAD_REQUEST.name())
                .message(e.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        ErrorDetails error = ErrorDetails.builder()
                .status(HttpStatus.BAD_REQUEST.name())
                .message(message).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

    }
}
