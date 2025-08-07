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

    public List<SentimentResponse> analyzeSentiment(String text) {
        List<SentimentResponse> results = new ArrayList<>();

        // Create an annotation object
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);

        // Process each sentence
        List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);
        for (CoreMap sentence : sentences) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            SentimentResponse response = new SentimentResponse();
            response.setSentence(sentence.toString());
            response.setSentiment(sentiment);
            results.add(response);
        }

        return results;
    }

    public List<SentimentAnalysis> getAllSentimentAnalysis() {
        return sentimentAnalysisRepository.findAll();
    }
}
