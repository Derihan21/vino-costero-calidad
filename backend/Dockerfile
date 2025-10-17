FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /build

# Copy the whole project into the build container and run mvn package
COPY . /build
RUN mvn -f /build/pom.xml -B -DskipTests package -DskipTests

FROM eclipse-temurin:17-jdk-focal
WORKDIR /app
# Copy the packaged jar from the build stage
COPY --from=build /build/target/vino-costero-backend-0.1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
