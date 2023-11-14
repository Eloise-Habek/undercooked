# Container za izgradnju (build) aplikacije
FROM openjdk:17-alpine AS builder

WORKDIR /app

## Ovdje je moguce instalirati alate potrebne za rad aplikacije. Vjerojatno vam nece trebati, no dobro je znati.
## Linux distro koji se koristi je Alpine, stoga se kao package manager koristi apk
#RUN apk install <nesto>

COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .
RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline

COPY src src
RUN ./mvnw package

RUN cp target/*.jar app.jar

EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","app.jar"]
