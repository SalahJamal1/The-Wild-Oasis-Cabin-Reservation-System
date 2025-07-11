package com.app.wild.bookings;


import com.app.wild.cabins.Cabin;
import com.app.wild.user.User;
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
    private Integer id;

    @CreationTimestamp
    private Timestamp createdAt;

    private Timestamp startDate;

    private Timestamp endDate;

    private boolean hasBreakfast;

    private String observations;

    private boolean isPaid;

    private Integer numGuests;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cabin_id", nullable = false)
    private Cabin cabin;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
//    @JsonIgnore
    private User user;
}
