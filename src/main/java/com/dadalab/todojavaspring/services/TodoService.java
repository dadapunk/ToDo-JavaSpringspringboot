package com.dadalab.todojavaspring.services;

import com.dadalab.todojavaspring.models.DTO.TodoDTO;
import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public List<Todo> findByUserId(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("userId cannot be null");
        }

        return todoRepository.findByUserId(userId);
    }
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

    public ResponseEntity<String> deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.ok("TODO deleted successfully");
        } else {
            throw new EntityNotFoundException("Todo not found with id: " + id);
        }
    }



    public Page<Todo> getTodosByTitleAndUsername(int pageNumber, int pageSize, String title, String username) {
        Pageable paging = PageRequest.of(pageNumber, pageSize);

        if (title != null && username != null) {
            return todoRepository.findByTitleContainingIgnoreCaseAndUserUsernameContainingIgnoreCase(title, username, paging);
        } else if (title != null) {
            return todoRepository.findByTitleContaining(title, paging);
        } else if (username != null) {
            return todoRepository.findByUserUsernameContaining(username, paging);
        } else {
            return todoRepository.findAll(paging);
        }
    }


    public Todo getTodoById(Long id) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            return optionalTodo.get();
        } else {
            throw new EntityNotFoundException("No se encontró un TODO con el ID proporcionado: " + id);
        }
    }


}
