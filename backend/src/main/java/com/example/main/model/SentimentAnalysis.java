package com.example.main.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class SentimentAnalysis {
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "u_id", length = 15)
    private Long u_id;

    @Column(name = "sentiment", length = 500)
    private String sentiment;

    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime created_at;

}
