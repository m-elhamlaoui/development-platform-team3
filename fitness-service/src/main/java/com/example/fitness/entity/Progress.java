package com.example.fitness.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long workoutId;
    private String date;
    private int setsCompleted;
    private int repsCompleted;
    private int duration; // in minutes for cardio
    private double weightUsed; // weight used in exercise
    // Getters and setters
}
