package com.example.main.model;

import javax.persistence.*;

@Entity
@Table(name = "survey")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "easy_to_use", length = 10)
    private String easyToUse;

    @Column(name = "helpful_support", length = 10)
    private String helpfulSupport;

    @Column(name = "found_what_needed", length = 10)
    private String foundWhatNeeded;

    @Column(name = "use_again", length = 10)
    private String useAgain;

    @Column(name = "recommend", length = 10)
    private String recommend;

    @Column(name = "comments", length = 500)
    private String comments;

    public Survey() {}

    public Survey(String name, String email, String easyToUse, String helpfulSupport, 
                  String foundWhatNeeded, String useAgain, String recommend, String comments) {
        this.name = name;
        this.email = email;
        this.easyToUse = easyToUse;
        this.helpfulSupport = helpfulSupport;
        this.foundWhatNeeded = foundWhatNeeded;
        this.useAgain = useAgain;
        this.recommend = recommend;
        this.comments = comments;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEasyToUse() { return easyToUse; }
    public void setEasyToUse(String easyToUse) { this.easyToUse = easyToUse; }

    public String getHelpfulSupport() { return helpfulSupport; }
    public void setHelpfulSupport(String helpfulSupport) { this.helpfulSupport = helpfulSupport; }

    public String getFoundWhatNeeded() { return foundWhatNeeded; }
    public void setFoundWhatNeeded(String foundWhatNeeded) { this.foundWhatNeeded = foundWhatNeeded; }

    public String getUseAgain() { return useAgain; }
    public void setUseAgain(String useAgain) { this.useAgain = useAgain; }

    public String getRecommend() { return recommend; }
    public void setRecommend(String recommend) { this.recommend = recommend; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
}