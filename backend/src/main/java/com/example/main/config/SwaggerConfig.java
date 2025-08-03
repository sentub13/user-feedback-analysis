package com.example.main.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Store API")
                .version("1.0")
                .description("REST API for Store Management System")
                .contact(new Contact()
                        .name("Feedback Team")
                        .email("contact@feedback.com")
                        .url("www.feedback.com")));
    }
}