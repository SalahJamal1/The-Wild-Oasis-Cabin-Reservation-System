package com.app.wild.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class HandelException {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handelException(RuntimeException exc) {
        ErrorResponse error = new ErrorResponse(new Date(), exc.getMessage(), HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handelException(Exception exc) {
        ErrorResponse error = new ErrorResponse(new Date(), exc.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


}
