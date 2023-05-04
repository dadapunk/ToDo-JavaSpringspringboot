package com.dadalab.todojavaspring.controllers;

import com.dadalab.todojavaspring.models.DTO.TodoDTO;
import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import com.dadalab.todojavaspring.services.TodoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private TodoService todoService;

    @GetMapping("/alles")
    public List<Todo> getAllTodos()
    {
        return todoRepository.findAll();
    }
    @GetMapping("/all")
    public Page<Todo> getAllTodos(@RequestParam(defaultValue = "0") int pageNumber,
                                  @RequestParam(defaultValue = "10") int pageSize)
                                   {
        return todoService.getAllTodos(pageNumber, pageSize);
    }
    @GetMapping("/filters")
    public Page<Todo> getFilterTodos(@RequestParam(defaultValue = "0") int pageNumber,
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
    @GetMapping("/id/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Todo todo = todoService.getTodoById(id);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(todo);
        }
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Long> saveTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoService.saveTodo(todo);
        return new ResponseEntity<>(savedTodo.getId(), HttpStatus.CREATED);
    }


    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Todo updateTodo(@PathVariable Long id, @RequestBody TodoDTO todoDTO) {
        return todoService.updateTodo(id, todoDTO);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.ok("TODO deleted successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("TODO not found with id: " + id);
        }
    }

}
