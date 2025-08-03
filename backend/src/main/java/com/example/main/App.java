package com.example.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main application class
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.example.main")
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
        System.out.println("Application started successfully!");
        System.out.println("Database tables should be created automatically.");
    }
}