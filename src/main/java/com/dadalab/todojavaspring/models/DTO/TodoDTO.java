package com.dadalab.todojavaspring.models.DTO;

import lombok.Data;

@Data
public class TodoDTO {
    private String title;
    private Boolean completed;
}
