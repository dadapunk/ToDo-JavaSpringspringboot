package com.dadalab.todojavaspring.controllers;

import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import com.dadalab.todojavaspring.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private TodoService todoService;

    @GetMapping("/{userId}")
    public List<Todo> getTodosByUserId(@PathVariable Long userId) {

        return todoRepository.findByUserId(userId);
    }
    @PostMapping("/new-todo")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@RequestBody Todo todo) {
        todoService.saveTodo(todo);
    }


}
