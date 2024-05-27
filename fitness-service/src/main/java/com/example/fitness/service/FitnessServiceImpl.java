package com.example.fitness.service;

import com.example.fitness.entity.Workout;
import com.example.fitness.entity.Progress;
import com.example.fitness.repository.WorkoutRepository;
import com.example.fitness.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FitnessServiceImpl implements FitnessService {
    private final WorkoutRepository workoutRepository;
    private final ProgressRepository progressRepository;

    @Autowired
    public FitnessServiceImpl(WorkoutRepository workoutRepository, ProgressRepository progressRepository) {
        this.workoutRepository = workoutRepository;
        this.progressRepository = progressRepository;
    }

    @Override
    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    @Override
    public Workout updateWorkout(Long id, Workout workout) {
        workout.setId(id);
        return workoutRepository.save(workout);
    }

    @Override
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }

    @Override
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @Override
    public Progress createProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    @Override
    public List<Progress> getProgressByUserId(Long userId) {
        return progressRepository.findByUserId(userId);
    }
}
