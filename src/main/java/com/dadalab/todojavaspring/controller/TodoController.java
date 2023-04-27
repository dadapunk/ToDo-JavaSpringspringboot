package com.dadalab.todojavaspring.controller;

import com.dadalab.todojavaspring.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/{userId}")
    public List<Todo> getTodosByUserId(@PathVariable Long userId) {
        return todoRepository.findByUserId(userId);
    }
}
