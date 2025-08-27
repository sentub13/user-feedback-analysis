package com.example.main.service;

import com.example.main.model.SentimentAnalysis;
import com.example.main.model.SentimentResponse;
import com.example.main.repository.SentimentAnalysisRepository;
import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.*;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SentimentAnalysisService {

    @Autowired
    private SentimentAnalysisRepository sentimentAnalysisRepository;

    private final StanfordCoreNLP pipeline;

    public SentimentAnalysisService() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,pos,lemma,parse,sentiment");
        this.pipeline = new StanfordCoreNLP(props);
    }

    // Remove the manual scoring method and use Stanford CoreNLP for sentiment analysis
    public String analyzeSurveyResponse(String text) {
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);
        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);
        if (sentences == null || sentences.isEmpty()) return "Neutral";
        int totalScore = 0;
        for (CoreMap sentence : sentences) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            int score = mapStanfordSentimentToScore(sentiment);
            totalScore += score;
        }
        double avgScore = (double) totalScore / sentences.size();
        if (avgScore >= 3.0) return "Positive";
        if (avgScore <= 1.5) return "Negative";
        return "Neutral";
    }

    private int mapStanfordSentimentToScore(String sentiment) {
        switch (sentiment) {
            case "Very Positive": return 4;
            case "Positive": return 3;
            case "Neutral": return 2;
            case "Negative": return 1;
            case "Very Negative": return 0;
            default: return 2;
        }
    }

    // Returns a list of SentimentResponse for the given text
    public List<SentimentResponse> analyzeSentiment(String text) {
        List<SentimentResponse> results = new ArrayList<>();
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);
        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);
        if (sentences != null) {
            for (CoreMap sentence : sentences) {
                String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
                SentimentResponse response = new SentimentResponse();
                response.setSentence(sentence.toString());
                response.setSentiment(sentiment);
                results.add(response);
            }
        }
        return results;
    }

    // Returns all SentimentAnalysis records from the repository
    public List<SentimentAnalysis> getAllSentimentAnalysis() {
        return sentimentAnalysisRepository.findAll();
    }

}
