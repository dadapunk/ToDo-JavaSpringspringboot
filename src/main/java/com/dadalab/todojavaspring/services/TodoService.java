package com.dadalab.todojavaspring.services;

import com.dadalab.todojavaspring.models.DTO.TodoDTO;
import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;
    public Todo saveTodo(Todo todo) {
        if (todo.getTitle() == null || todo.getTitle().isEmpty()) {
            throw new IllegalArgumentException("The field 'title' can not be empty");
        }
        return todoRepository.save(todo);
    }


    public Todo updateTodo(Long id, TodoDTO todoDTO) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ToDo not found"));
        if (todoDTO.getTitle() != null) {
            todo.setTitle(todoDTO.getTitle());
            todo.setCompleted(todoDTO.getCompleted());
        }
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Todo not found with id: " + id);
        }
    }
    // List by UserId

}
