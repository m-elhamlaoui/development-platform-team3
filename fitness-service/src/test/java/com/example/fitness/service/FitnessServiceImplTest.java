package com.example.fitness.service;

import com.example.fitness.entity.Workout;
import com.example.fitness.repository.WorkoutRepository;
import com.example.fitness.entity.Progress;
import com.example.fitness.repository.ProgressRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FitnessServiceImplTest {

    @Mock
    private WorkoutRepository workoutRepository;

    @Mock
    private ProgressRepository progressRepository;

    @InjectMocks
    private FitnessServiceImpl fitnessService;

    private Workout workout;
    private Progress progress;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        workout = new Workout();
        workout.setName("Test Workout");

        progress = new Progress();
        progress.setUserId(1L);
        progress.setWorkoutId(1L);
        progress.setSetsCompleted(3);
    }

    @Test
    void createWorkout_ShouldSaveWorkout() {
        when(workoutRepository.save(any(Workout.class))).thenReturn(workout);

        Workout savedWorkout = fitnessService.createWorkout(workout);

        assertNotNull(savedWorkout);
        assertEquals("Test Workout", savedWorkout.getName());
        verify(workoutRepository, times(1)).save(any(Workout.class));
    }

    @Test
    void getAllWorkouts_ShouldReturnAllWorkouts() {
        when(workoutRepository.findAll()).thenReturn(Arrays.asList(workout));

        List<Workout> workouts = fitnessService.getAllWorkouts();

        assertNotNull(workouts);
        assertFalse(workouts.isEmpty());
        assertEquals(1, workouts.size());
        verify(workoutRepository, times(1)).findAll();
    }

    @Test
    void createProgress_ShouldSaveProgress() {
        when(progressRepository.save(any(Progress.class))).thenReturn(progress);

        Progress savedProgress = fitnessService.createProgress(progress);

        assertNotNull(savedProgress);
        assertEquals(3, savedProgress.getSetsCompleted());
        verify(progressRepository, times(1)).save(any(Progress.class));
    }

    @Test
    void getProgressByUserId_ShouldReturnProgressList() {
        when(progressRepository.findByUserId(anyLong())).thenReturn(Arrays.asList(progress));

        List<Progress> progressList = fitnessService.getProgressByUserId(1L);

        assertNotNull(progressList);
        assertFalse(progressList.isEmpty());
        assertEquals(1, progressList.size());
        verify(progressRepository, times(1)).findByUserId(anyLong());
    }
}
