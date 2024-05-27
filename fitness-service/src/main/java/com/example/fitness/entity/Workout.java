package com.example.fitness.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type; // e.g., Cardio, Strength
    private int sets;
    private int reps;
    private int duration; // in minutes for cardio
    private double weight; // weight used in exercise
    // Getters and setters

    // Builder Pattern
    public static class Builder {
        private String name;
        private String type;
        private int sets;
        private int reps;
        private int duration;
        private double weight;

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setType(String type) {
            this.type = type;
            return this;
        }

        public Builder setSets(int sets) {
            this.sets = sets;
            return this;
        }

        public Builder setReps(int reps) {
            this.reps = reps;
            return this;
        }

        public Builder setDuration(int duration) {
            this.duration = duration;
            return this;
        }

        public Builder setWeight(double weight) {
            this.weight = weight;
            return this;
        }

        public Workout build() {
            Workout workout = new Workout();
            workout.name = this.name;
            workout.type = this.type;
            workout.sets = this.sets;
            workout.reps = this.reps;
            workout.duration = this.duration;
            workout.weight = this.weight;
            return workout;
        }
    }
}
