# Fitness Tracker Application

## 1. Names of the Team Members
- RACHDI Mouhssine
- NAHLI Yahya
- TAOUSSI Oussama

## 2. Brief Overview
The Fitness Tracker application is a comprehensive solution designed to help users manage their fitness routines and track their progress over time. The application is built using a microservices architecture, ensuring scalability, maintainability, and flexibility. 

### Key Features:
- **User Authentication**: Secure user registration and login functionalities using JWT (JSON Web Tokens).
- **Workout Management**: Allows users to create, update, view, and delete workout routines. Users can specify details such as workout type, sets, reps, duration, and weight used.
- **Progress Tracking**: Enables users to log their progress, including sets completed, reps completed, duration, and weight used for each workout session.
- **User Roles**: Different user roles such as admin and regular users to manage access and permissions.

### Technical Overview:
- **Microservices Architecture**: The backend is divided into two main services:
  - **Auth Service**: Manages user authentication and authorization.
  - **Fitness Service**: Handles workout and progress management.
- **Frontend**: A modern single-page application (SPA) built with React, providing a responsive and interactive user interface.
- **Databases**: PostgreSQL is used as the database for both services to store user data, workouts, and progress logs.
- **CI/CD Pipeline**: Automated pipelines for building, testing, and deploying the application using GitHub Actions, Docker, and Kubernetes.
- **Containerization**: The application services are containerized using Docker, ensuring consistency across different environments.
- **Orchestration**: Kubernetes is used to deploy, manage, and scale the application containers.

### Detailed Workflow:
1. **User Registration and Login**:
   - Users can register by providing their username and password.
   - Upon registration, the password is hashed and stored securely in the database.
   - Users can log in by providing valid credentials, which are authenticated using JWT. A token is generated and returned to the user for subsequent requests.

2. **Workout Management**:
   - After logging in, users can create workout routines specifying details such as workout name, type, sets, reps, duration, and weight.
   - Users can view their created workouts, update details, or delete workouts as needed.
   - The fitness service handles all CRUD operations related to workouts.

3. **Progress Tracking**:
   - Users can log their workout progress by recording the sets completed, reps completed, duration, and weight used for each session.
   - Progress logs can be viewed to track improvements over time, providing insights into the user’s fitness journey.

4. **Admin Management**:
   - Admin users have additional capabilities to manage other user accounts, ensuring proper application usage and security.


## 3. Table of Contents
1. [Names of the Team Members](#1-names-of-the-team-members)
2. [Brief Overview](#2-brief-overview)
3. [Table of Contents](#3-table-of-contents)
4. [Design and Architecture of the Project](#4-design-and-architecture-of-the-project)
   - [UML Diagrams](#4a-design-of-the-app)
     - [UML Use Case Diagram](#4a1-uml-use-case-diagram)
     - [UML Sequence Diagram](#4a2-uml-sequence-diagram)
     - [UML Class Diagram](#4a3-uml-class-diagram)
   - [Architecture and deployement of the Project](#4b-architecture-of-the-project)
     - [Component Descriptions](#4b3-component-descriptions)
5. [Demo of the Application](#5-demo-of-the-application)
   - [Login Page](#5a-login-page)
   - [Register Page](#5b-register-page)
   - [Workouts Page](#5c-workouts-page)
   - [Progress Page](#5d-progress-page)

## 4. Design and Architecture of the Project

### **UML diagrams**

####  **UML Use Case Diagram**
![usecasejee](https://github.com/OT330/FitnessProject/assets/78844930/97070fe6-c1f4-41bd-bf4d-ef72a42a0137)

####  **UML Sequence Diagram**
![seqjee](https://github.com/OT330/FitnessProject/assets/78844930/df1718c4-1c4a-40b3-acdd-00a3aa51ef41)


####  **UML Class Diagram**
![classjee](https://github.com/OT330/FitnessProject/assets/78844930/8d84c5eb-e266-4323-bb82-8619a775e322)



###  **Implementation and deployement description**

- **Authentication Service**:
  - **Description**: Manages user registration and authentication.
  - **Technologies Used**: Spring Boot, Spring Security, JWT.
  
- **Fitness Service**:
  - **Description**: Manages workout routines and tracks fitness progress.
  - **Technologies Used**: Spring Boot, JPA, Hibernate.
  
- **Frontend Application**:
  - **Description**: User interface for interacting with the backend services.
  - **Technologies Used**: React, Axios, PrimeReact.

- **CI/CD Pipeline**:
  - **Description**: Automated pipeline for building, testing, and deploying the application.
  - **Technologies Used**: GitHub Actions, Docker, Kubernetes.
  
  **Pipeline Details**:
  
  1. **Checkout Code**:
     - **Step**: Uses `actions/checkout@v2` to clone the repository.
     - **Purpose**: Fetches the latest code from the main branch.

  2. **Set up JDK 17**:
     - **Step**: Uses `actions/setup-java@v2` to install Java 17.
     - **Purpose**: Ensures the environment has the correct version of Java to build the Spring Boot applications.

  3. **Build and Test Auth Service**:
     - **Step**: Navigates to the `auth-service` directory, runs `mvn clean install`, and `mvn test`.
     - **Purpose**: Compiles the `auth-service` and runs all unit tests to ensure the code is functioning correctly.

  4. **Build and Test Fitness Service**:
     - **Step**: Navigates to the `fitness-service` directory, runs `mvn clean install`, and `mvn test`.
     - **Purpose**: Compiles the `fitness-service` and runs all unit tests to ensure the code is functioning correctly.

  5. **Build Docker Images**:
     - **Step**: Builds Docker images for both `auth-service` and `fitness-service` using `docker build`.
     - **Purpose**: Packages the services into Docker containers for consistent deployment across environments.

  6. **Log in to Docker Hub**:
     - **Step**: Uses Docker CLI to log in to Docker Hub using credentials stored in GitHub Secrets.
     - **Purpose**: Authenticates with Docker Hub to allow pushing Docker images.

  7. **Push Docker Images**:
     - **Step**: Pushes the Docker images to Docker Hub.
     - **Purpose**: Makes the Docker images available in Docker Hub for deployment.

  8. **Install Node.js**:
     - **Step**: Uses `actions/setup-node@v2` to install Node.js version 20.
     - **Purpose**: Sets up the Node.js environment needed to build the React frontend.

  9. **Build Frontend**:
     - **Step**: Navigates to the `frontend` directory, installs dependencies with `npm install`, and builds the project with `npm run build`.
     - **Purpose**: Compiles the React frontend into static files for deployment.

  10. **Deploy Frontend to GitHub Pages**:
      - **Step**: Uses `peaceiris/actions-gh-pages@v3` to deploy the built frontend to GitHub Pages.
      - **Purpose**: Publishes the frontend application to GitHub Pages for easy access.

  11. **Set up Kubectl**:
      - **Step**: Uses `azure/setup-kubectl@v1` to install `kubectl`.
      - **Purpose**: Ensures `kubectl` is available for interacting with your Kubernetes cluster.

  12. **Set up Kubeconfig**:
      - **Step**: Loads the Kubernetes configuration from the GitHub Secret.
      - **Purpose**: Configures `kubectl` to use the correct Kubernetes cluster.

  13. **Deploy to Kubernetes**:
      - **Step**: Applies the Kubernetes deployment files using `kubectl apply`.
      - **Purpose**: Deploys the services to the Kubernetes cluster.

## 5. Demo of the Application

### **Login Page**
![WhatsApp Image 2024-05-27 at 7 23 15 AM](https://github.com/OT330/FitnessProject/assets/78844930/a1aae27e-957f-4d00-8047-d5ac0c3e4380)


### **Register Page**
![WhatsApp Image 2024-05-27 at 7 23 39 AM](https://github.com/OT330/FitnessProject/assets/78844930/e87e2924-d67a-486f-a8f1-883170f11469)


### **Workouts Page**
![WhatsApp Image 2024-05-27 at 7 21 15 AM (1)](https://github.com/OT330/FitnessProject/assets/78844930/296456d6-68e0-43fe-a800-28d4130bc29d)
![WhatsApp Image 2024-05-27 at 7 21 15 AM](https://github.com/OT330/FitnessProject/assets/78844930/c4f19cb0-44dc-4680-866a-64b3f2ea3edb)

### **Progress Page**
![WhatsApp Image 2024-05-27 at 7 22 52 AM](https://github.com/OT330/FitnessProject/assets/78844930/e9e9c54d-d8be-49cf-b469-89db8609a9fd)

