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
        // Prepare texts for each question
        String frequency = savedFeedback.getU_frequency() != null ? savedFeedback.getU_frequency() : "";
        String text1 = "I use the portal on a " + frequency;

        String satisfaction = savedFeedback.getU_satisfaction() != null ? savedFeedback.getU_satisfaction() : "";
        String text2 = "I find all the features of this portal " + satisfaction;

        Boolean recommendation = savedFeedback.getU_recommendation() != null ? savedFeedback.getU_recommendation() : false;
        String text3 = recommendation + ", I would definitely recommend this portal to my colleagues";

        String used_feature = savedFeedback.getU_used_feature() != null ? savedFeedback.getU_used_feature() : "";
        String text4 = "The current "+used_feature+" features are comprehensive and helpful for my needs.";

        String text5 = savedFeedback.getU_issues_faced() != null ? savedFeedback.getU_issues_faced() : "";
        String text6 = savedFeedback.getU_suggestions() != null ? savedFeedback.getU_suggestions() : "";

        // Analyze sentiment for each question using the injected SentimentAnalysisService instance
        String sentiment1 = null, sentiment2 = null, sentiment3 = null, sentiment4 = null, sentiment5 = null, sentiment6 = null;
        List<SentimentResponse> responses;

        responses = sentimentAnalysisService.analyzeSentiment(text1);
        if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
            sentiment1 = responses.get(0).getSentiment();
        }
        responses = sentimentAnalysisService.analyzeSentiment(text2);
        if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
            sentiment2 = responses.get(0).getSentiment();
        }
        responses = sentimentAnalysisService.analyzeSentiment(text3);
        if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
            sentiment3 = responses.get(0).getSentiment();
        }
        responses = sentimentAnalysisService.analyzeSentiment(text4);
        if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
            sentiment4 = responses.get(0).getSentiment();
        }
        responses = sentimentAnalysisService.analyzeSentiment(text5);
        if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
            sentiment5 = responses.get(0).getSentiment();
        }
        responses = sentimentAnalysisService.analyzeSentiment(text6);
        if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
            sentiment6 = responses.get(0).getSentiment();
        }

        // Save sentiment analysis results
        SentimentAnalysis sentimentAnalysis = new SentimentAnalysis();
        sentimentAnalysis.setFb_id(savedFeedback.getId());
        sentimentAnalysis.setFb_frequency(sentiment1);
        sentimentAnalysis.setFb_satisfaction(sentiment2);
        sentimentAnalysis.setFb_recommendation(sentiment3);
        sentimentAnalysis.setFb_used_feature(sentiment4);
        sentimentAnalysis.setFb_issues_faced(sentiment5);
        sentimentAnalysis.setFb_suggestions(sentiment6);
        sentimentAnalysis.setFb_created_at(savedFeedback.getCreated_at());
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
}