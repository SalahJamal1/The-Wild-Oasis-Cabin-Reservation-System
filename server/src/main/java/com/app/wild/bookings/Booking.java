package com.app.wild.bookings;


import com.app.wild.cabins.Cabin;
import com.app.wild.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;
    @Column(name = "start_date")
    private Timestamp startDate;
    @Column(name = "end_date")
    private Timestamp endDate;
    @Column(name = "has_breakfast")
    private boolean hasBreakfast;
    @Column(name = "observations")
    private String observations;
    @Column(name = "is_paid")
    private boolean isPaid;
    @Column(name = "num_guests")
    private Integer numGuests;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cabin_id", nullable = false)
    private Cabin cabin;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)   
     private User user;
}
