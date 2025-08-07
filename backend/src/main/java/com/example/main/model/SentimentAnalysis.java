package com.example.main.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sentiment_analysis")
public class SentimentAnalysis {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fb_id")
    private Long fb_id;

    @Column(name = "fb_frequency", length = 500)
    private String fb_frequency;

    @Column(name = "fb_satisfaction", length = 50)
    private String fb_satisfaction;

    @Column(name = "fb_recommendation", length = 50)
    private String fb_recommendation;

    @Column(name = "fb_used_feature", length = 500)
    private String fb_used_feature;

    @Column(name = "fb_issues_faced", length = 500)
    private String fb_issues_faced;

    @Column(name = "fb_suggestions", length = 500)
    private String fb_suggestions;

    @Column(name = "fb_overall_summary", length = 500)
    private String fb_overall_summary;

    public SentimentAnalysis(){}
    public SentimentAnalysis(Long id, Long fb_id, String fb_frequency, String fb_satisfaction, String fb_recommendation, String fb_used_feature, String fb_issues_faced, String fb_suggestions, String fb_overall_summary) {
        this.id = id;
        this.fb_id = fb_id;
        this.fb_frequency = fb_frequency;
        this.fb_satisfaction = fb_satisfaction;
        this.fb_recommendation = fb_recommendation;
        this.fb_used_feature = fb_used_feature;
        this.fb_issues_faced = fb_issues_faced;
        this.fb_suggestions = fb_suggestions;
        this.fb_overall_summary = fb_overall_summary;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFb_id() { return fb_id; }
    public void setFb_id(Long fb_id) { this.fb_id = fb_id; }
    public String getFb_frequency() { return fb_frequency; }
    public void setFb_frequency(String fb_frequency) { this.fb_frequency = fb_frequency; }
    public String getFb_satisfaction() { return fb_satisfaction; }
    public void setFb_satisfaction(String fb_satisfaction) { this.fb_satisfaction = fb_satisfaction; }
    public String getFb_recommendation() { return fb_recommendation; }
    public void setFb_recommendation(String fb_recommendation) { this.fb_recommendation = fb_recommendation; }
    public String getFb_used_feature() {return fb_used_feature; }
    public void setFb_used_feature(String fb_used_feature) { this.fb_used_feature = fb_used_feature;}
    public String getFb_issues_faced() { return fb_issues_faced; }
    public void setFb_issues_faced(String fb_issues_faced) { this.fb_issues_faced = fb_issues_faced; }
    public String getFb_suggestions() { return fb_suggestions; }
    public void setFb_suggestions(String fb_suggestions) { this.fb_suggestions = fb_suggestions;  }
    public String getFb_overall_summary() { return fb_overall_summary; }
    public void setFb_overall_summary(String fb_overall_summary) {this.fb_overall_summary = fb_overall_summary; }
}
