package com.example.main.service;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.*;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.stereotype.Service;
import com.example.main.model.SentimentResponse;
import java.util.*;

@Service
public class SentimentAnalysisService {

    private final StanfordCoreNLP pipeline;

    public SentimentAnalysisService() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,pos,lemma,parse,sentiment");
        this.pipeline = new StanfordCoreNLP(props);
    }

    private String normalizeSentiment(String sentiment) {
        if (sentiment == null) return "Neutral";
        switch (sentiment.toLowerCase()) {
            case "very positive":
            case "positive":
                return "Positive";
            case "very negative":
            case "negative":
                return "Negative";
            default:
                return "Neutral";
        }
    }

    public List<SentimentResponse> analyzeSentiment(String text) {
        List<SentimentResponse> results = new ArrayList<>();

        // Create an annotation object
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);

        // Process all sentences to get overall sentiment
        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);

        // Calculate overall sentiment from all sentences
        Map<String, Integer> sentimentCounts = new HashMap<>();
        for (CoreMap sentence : sentences) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            sentiment = normalizeSentiment(sentiment);
            sentimentCounts.put(sentiment, sentimentCounts.getOrDefault(sentiment, 0) + 1);
        }

        // Get the most common sentiment
        String overallSentiment = sentimentCounts.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElse("Neutral");

        // Return single response for entire text
        SentimentResponse response = new SentimentResponse();
        response.setSentence(text);
        response.setSentiment(overallSentiment);
        results.add(response);

        return results;
    }
}
