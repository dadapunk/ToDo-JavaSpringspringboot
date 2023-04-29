package com.dadalab.todojavaspring.services;

import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;
    public Todo saveTodo(Todo todo) {
        return todoRepository.save(todo);
    }

}
