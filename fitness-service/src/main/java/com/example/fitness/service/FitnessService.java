package com.example.fitness.service;

import com.example.fitness.entity.Workout;
import com.example.fitness.entity.Progress;

import java.util.List;

public interface FitnessService {
    Workout createWorkout(Workout workout);
    Workout updateWorkout(Long id, Workout workout);
    void deleteWorkout(Long id);
    List<Workout> getAllWorkouts();
    Progress createProgress(Progress progress);
    List<Progress> getProgressByUserId(Long userId);
}
