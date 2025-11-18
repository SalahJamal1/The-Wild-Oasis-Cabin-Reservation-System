package com.example.demo.bookings;

import com.example.demo.cabins.Cabin;
import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private boolean has_breakfast;
    private boolean isPaid = false;
    private Integer numGuests;
    private String observations;
    private LocalDateTime endDate;
    private LocalDateTime startDate;
    private Long totalPrice;
    private Integer numNights;

    @ManyToOne
    @JoinColumn(name = "cabin_id")
    private Cabin cabin;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
