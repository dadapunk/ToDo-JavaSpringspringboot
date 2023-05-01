package com.dadalab.todojavaspring.controllers;

import com.dadalab.todojavaspring.models.DTO.TodoDTO;
import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import com.dadalab.todojavaspring.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/all")
    public Page<Todo> getAllTodos(@RequestParam(defaultValue = "0") int pageNumber,
                                  @RequestParam(defaultValue = "10") int pageSize,
                                  @RequestParam(required = false) String title,
                                  @RequestParam(required = false) String username) {
        return todoService.getTodosByTitleAndUsername(pageNumber, pageSize, title, username);
    }



    @GetMapping("/{userId}")
    public List<Todo> getTodosByUserId(@PathVariable Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId cannot be null");
        }
        return todoService.findByUserId(userId);
    }
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveUser(@RequestBody Todo todo) {
        todoService.saveTodo(todo);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Todo updateTodo(@PathVariable Long id, @RequestBody TodoDTO todoDTO) {
        return todoService.updateTodo(id, todoDTO);
    }
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
