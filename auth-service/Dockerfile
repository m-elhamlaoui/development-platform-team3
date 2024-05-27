# Use the Eclipse Temurin base image for OpenJDK 17
FROM eclipse-temurin:17-jre-focal

# Copy the built JAR file into the container
COPY target/auth-service-0.0.1-SNAPSHOT.jar auth-service.jar

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "/auth-service.jar"]
