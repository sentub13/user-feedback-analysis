package com.example.main.model;

import javax.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "u_fname", length = 100)
    private String u_fname;

    @Column(name = "u_lastname", length = 100)
    private  String u_lastname;

    @Column(name = "u_id", length = 15)
    private Long u_id;

    @Column(name = "u_email", length = 100)
    private String u_email;

    @Column(name = "u_frequency", length = 10)
    private Integer u_frequency;

    @Column(name = "u_suggestions", length = 10)
    private String u_suggestions;

    @Column(name = "u_satisfaction", length = 10)
    private String u_satisfaction;

    @Column(name = "u_issues_faced", length = 10)
    private String u_issues_faced;

    @Column(name = "u_recommendation")
    private Boolean u_recommendation;

    @Column(name = "u_used_feature", length = 500)
    private String u_used_feature;

    public Feedback() {}
    public Feedback(String u_fname, String u_lastname, Long u_id, String u_email, Integer u_frequency,
                    String u_suggestions, String u_satisfaction, String u_issues_faced,
                    Boolean u_recommendation, String u_used_feature) {
        this.u_fname = u_fname;
        this.u_lastname = u_lastname;
        this.u_id = u_id;
        this.u_email = u_email;
        this.u_frequency = u_frequency;
        this.u_suggestions = u_suggestions;
        this.u_satisfaction = u_satisfaction;
        this.u_issues_faced = u_issues_faced;
        this.u_recommendation = u_recommendation;
        this.u_used_feature = u_used_feature;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getU_fname() {
        return u_fname;
    }
    public void setU_fname(String u_fname) {
        this.u_fname = u_fname;
    }
    public String getU_lastname() {
        return u_lastname;
    }
    public void setU_lastname(String u_lastname) {
        this.u_lastname = u_lastname;
    }
    public Long getU_id() {
        return u_id;
    }
    public void setU_id(Long u_id) {
        this.u_id = u_id;
    }
    public String getU_email() {
        return u_email;
    }
    public void setU_email(String u_email) {
        this.u_email = u_email;
    }
    public Integer getU_frequency() {
        return u_frequency;
    }
    public void setU_frequency(Integer u_frequency) {
        this.u_frequency = u_frequency;
    }
    public String getU_suggestions() {
        return u_suggestions;
    }
    public void setU_suggestions(String u_suggestions) {
        this.u_suggestions = u_suggestions;
    }
    public String getU_satisfaction() {
        return u_satisfaction;
    }
    public void setU_satisfaction(String u_satisfaction) {
        this.u_satisfaction = u_satisfaction;
    }
    public String getU_issues_faced() {
        return u_issues_faced;
    }
    public void setU_issues_faced(String u_issues_faced) {
        this.u_issues_faced = u_issues_faced;
    }
    public Boolean getU_recommendation() {
        return u_recommendation;
    }
    public void setU_recommendation(Boolean u_recommendation) {
        this.u_recommendation = u_recommendation;
    }
    public String getU_used_feature() {
        return u_used_feature;
    }
    public void setU_used_feature(String u_used_feature) {
        this.u_used_feature = u_used_feature;
    }
}
