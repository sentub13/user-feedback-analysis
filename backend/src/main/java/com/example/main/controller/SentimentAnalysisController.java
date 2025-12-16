package com.example.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.main.service.SentimentAnalysisService;
import com.example.main.model.SentimentRequest;
import com.example.main.model.SentimentResponse;
import com.example.main.model.SentimentAnalysis;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SentimentAnalysisController {

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;


    @PostMapping("/sentimentAnalyze")
    public List<SentimentResponse> analyzeSentiment(@RequestBody SentimentRequest request) {
        return sentimentAnalysisService.analyzeSentiment(request.getText());
    }

    @GetMapping("/sentimentAnalyze")
    public List<SentimentAnalysis> getAllSentimentAnalysis() {
        return sentimentAnalysisService.getAllSentimentAnalysis();
    }
}