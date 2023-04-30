package com.dadalab.todojavaspring.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@Data
public class Address {
    private String street;
    private String city;
    private String country;

}
