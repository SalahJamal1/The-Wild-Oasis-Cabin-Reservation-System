package com.example.demo.bookings.dto;

import com.example.demo.cabins.Cabin;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Integer id;
    private LocalDateTime createdAt;
    private boolean has_breakfast;
    private boolean isPaid;
    private Integer numGuests;
    private String observations;
    private LocalDateTime endDate;
    private LocalDateTime startDate;
    private BigDecimal totalPrice;
    private Integer numNights;
    private Cabin cabin;
}
