package com.app.wild.cabins;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cabins")
public class Cabin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "max_capacity")
    private Integer maxCapacity;
    @Column(name = "regular_price")
    private Integer regularPrice;
    @Column(name = "discount")
    private Integer discount;
    @Column(name = "image")
    private String image;
    @Column(name = "description")
    private String description;

}
