package com.example.main.controller;
import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.*;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;

import java.util.*;


public class SentimentAnalysisExample {
    public static void main(String[] args) {
    // Set up the CoreNLP pipeline
    Properties props = new Properties();
    props.setProperty("annotators", "tokenize,ssplit,pos,lemma,parse,sentiment");
    StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

    // Input text
    String text = "I am very satisfied with this portal overall. This portal is loading very slow Which is leading me to reload the application everytime. Better maintain high capacity application server. ";

    // Create an annotation object
    Annotation annotation = new Annotation(text);
    pipeline.annotate(annotation);

    // Process each sentence
    List<CoreMap> sentences = annotation.get(CoreAnnotations.SentencesAnnotation.class);
    for (CoreMap sentence : sentences) {
      String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
        System.out.println("Sentence: " + sentence);
        System.out.println("Sentiment: " + sentiment);
      }
    }
}
