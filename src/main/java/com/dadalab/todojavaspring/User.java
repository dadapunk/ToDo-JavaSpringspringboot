package com.dadalab.todojavaspring;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String username;

    private String password;

    @Embedded
    private Address address;
}
