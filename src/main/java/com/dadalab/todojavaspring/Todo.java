package com.dadalab.todojavaspring;

import jakarta.persistence.*;

public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
