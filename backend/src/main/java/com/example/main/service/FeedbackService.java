package com.example.main.service;

import com.example.main.model.Feedback;
import com.example.main.model.SentimentAnalysis;
import com.example.main.repository.FeedbackRepository;
import com.example.main.repository.SentimentAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.main.service.SentimentAnalysisService;
import com.example.main.model.SentimentResponse;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private SentimentAnalysisRepository sentimentAnalysisRepository;

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;

    public Feedback saveFeedback(Feedback feedback) {
        Feedback savedFeedback = feedbackRepository.save(feedback);

        // Map structured answers directly to sentiment
        String sentiment1 = mapFrequencyToSentiment(savedFeedback.getU_frequency());
        String sentiment2 = mapSatisfactionToSentiment(savedFeedback.getU_satisfaction());
        String sentiment3 = mapRecommendationToSentiment(savedFeedback.getU_recommendation());
        // Use NLP for open text fields
        String sentiment4 = sentimentAnalysisService.analyzeSurveyResponse(savedFeedback.getU_used_feature());
        String sentiment5 = sentimentAnalysisService.analyzeSurveyResponse(savedFeedback.getU_issues_faced());
        String sentiment6 = sentimentAnalysisService.analyzeSurveyResponse(savedFeedback.getU_suggestions());

        // Save sentiment analysis results
        SentimentAnalysis sentimentAnalysis = new SentimentAnalysis();
        sentimentAnalysis.setFb_id(savedFeedback.getId());
        sentimentAnalysis.setU_feedback_for(savedFeedback.getU_feedback_for());
        sentimentAnalysis.setFb_frequency(sentiment1);
        sentimentAnalysis.setFb_satisfaction(sentiment2);
        sentimentAnalysis.setFb_recommendation(sentiment3);
        sentimentAnalysis.setFb_used_feature(sentiment4);
        sentimentAnalysis.setFb_issues_faced(sentiment5);
        sentimentAnalysis.setFb_suggestions(sentiment6);
        sentimentAnalysis.setFb_created_at(savedFeedback.getCreated_at());
        // Calculate overall sentiment from all six sentiment values
        String overallSentiment = calculateOverallSentiment(sentiment1, sentiment2, sentiment3, sentiment4, sentiment5, sentiment6);
        sentimentAnalysis.setFb_overall_summary(overallSentiment);
        sentimentAnalysisRepository.save(sentimentAnalysis);
        return savedFeedback;
    }


    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }

    public Feedback updateFeedback(Long id, Feedback feedback) {
        feedback.setId(id);
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }

    // Add mapping methods for structured fields
    private String mapFrequencyToSentiment(String frequency) {
        if (frequency == null) return "neutral";
        switch (frequency.trim().toLowerCase()) {
            case "never": return "Negative";
            case "rarely": return "Negative";
            case "monthly": return "neutral";
            case "weekly": return "Positive";
            case "daily": return "Positive";
            default: return "neutral";
        }
    }
    private String mapSatisfactionToSentiment(String satisfaction) {
        if (satisfaction == null) return "neutral";
        switch (satisfaction.trim().toLowerCase()) {
            case "very unsatisfied": return "Negative";
            case "unsatisfied": return "Negative";
            case "undecided": return "neutral";
            case "satisfied": return "Positive";
            case "very satisfied": return "Positive";
            default: return "neutral";
        }
    }
    private String mapRecommendationToSentiment(Object recommendation) {
        if (recommendation == null) return "neutral";
        if (recommendation instanceof Boolean) {
            return ((Boolean) recommendation) ? "Positive" : "Negative";
        }
        String recStr = recommendation.toString().trim().toLowerCase();
        if (recStr.equals("true")) return "Positive";
        if (recStr.equals("false")) return "Negative";
        return "neutral";
    }
    // Add method to calculate overall sentiment
    private String calculateOverallSentiment(String... sentiments) {
        int Positive = 0, Negative = 0, neutral = 0;
        for (String s : sentiments) {
            if (s == null) continue;
            switch (s.trim().toUpperCase()) {
                case "Positive": Positive++; break;
                case "Negative": Negative++; break;
                default: neutral++;
            }
        }
        if (Positive > Negative && Positive > neutral) return "Positive";
        if (Negative > Positive && Negative > neutral) return "Negative";
        return "neutral";
    }
}