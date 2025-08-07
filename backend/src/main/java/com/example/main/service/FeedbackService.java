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
        // Use SentimentAnalysisService to analyze sentiment
        String text = savedFeedback.getU_suggestions() != null ? savedFeedback.getU_suggestions() : "";
        String sentiment = "Neutral";
        if (!text.isEmpty()) {
            List<SentimentResponse> responses = sentimentAnalysisService.analyzeSentiment(text);
            if (!responses.isEmpty() && responses.get(0).getSentiment() != null) {
                sentiment = responses.get(0).getSentiment();
            }
        }
        SentimentAnalysis sentimentAnalysis = new SentimentAnalysis();
        sentimentAnalysis.setU_id(savedFeedback.getU_id());
        sentimentAnalysis.setSentiment(sentiment);
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