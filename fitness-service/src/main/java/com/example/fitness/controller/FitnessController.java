package com.example.fitness.controller;

import com.example.fitness.entity.Workout;
import com.example.fitness.entity.Progress;
import com.example.fitness.service.FitnessService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/fitness")
public class FitnessController {
    private static final Logger logger = LoggerFactory.getLogger(FitnessController.class);

    private final FitnessService fitnessService;

    @Value("${jwt.secret}")
    private String secretKey;

    @Autowired
    public FitnessController(FitnessService fitnessService) {
        this.fitnessService = fitnessService;
    }

    @GetMapping("/workouts")
    public List<Workout> getWorkouts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Fetching workouts for user: {}", username);
        // Fetch workouts for the logged-in user
        return fitnessService.getAllWorkouts();
    }

    @PostMapping("/workouts")
    public Workout createWorkout(@RequestBody Workout workout) {
        logger.info("Creating workout: {}", workout.getName());
        return fitnessService.createWorkout(workout);
    }

    @PutMapping("/workouts/{id}")
    public Workout updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        logger.info("Updating workout with id: {}", id);
        return fitnessService.updateWorkout(id, workout);
    }

    @DeleteMapping("/workouts/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        logger.info("Deleting workout with id: {}", id);
        fitnessService.deleteWorkout(id);
    }

    @GetMapping("/progress")
    public ResponseEntity<List<Progress>> getProgress(@RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        logger.info("Fetching progress for user id: {}", userId);
        List<Progress> progressList = fitnessService.getProgressByUserId(userId);
        return ResponseEntity.ok(progressList);
    }

    @PostMapping("/progress")
    public Progress createProgress(@RequestBody Progress progress) {
        logger.info("Creating progress entry for user id: {}", progress.getUserId());
        return fitnessService.createProgress(progress);
    }

    private Long getUserIdFromToken(String token) {
        String actualToken = token.replace("Bearer ", "");
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(actualToken).getBody();
        return Long.parseLong(claims.getSubject()); // Parse the subject as Long
    }
}