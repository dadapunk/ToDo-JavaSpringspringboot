package com.dadalab.todojavaspring;

import com.dadalab.todojavaspring.controllers.TodoController;
import com.dadalab.todojavaspring.models.Todo;
import com.dadalab.todojavaspring.services.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class TodoControllerTest {

    @Autowired
    private TodoController todoController;

    @MockBean
    private TodoService todoService;

    @Test
    public void testGetTodosByUserIdWithNullUserId() {
        Long userId = null;
        assertThrows(IllegalArgumentException.class, () -> {
            todoController.getTodosByUserId(userId);
        });
    }
    @Test
    public void testGetTodosByUserIdWithNonExistentUser() {
        // Arrange
        Long nonExistentUserId = Long.valueOf(9999);
        // Act
        List<Todo> todos = todoController.getTodosByUserId(nonExistentUserId);
        // Assert
        assertNotNull(todos);
        assertTrue(todos.isEmpty());
    }


    @Test
    public void testGetTodoById() {
        // Create an object and add to todos list in service
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setTitle("Comprar leche");
        when(todoService.getTodoById(1L)).thenReturn(todo);

        // ask to the controller
        ResponseEntity<Todo> response = todoController.getTodoById(1L);

        // Verify if has found the todo and the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Comprar leche", response.getBody().getTitle());
    }
    @Test
    public void testGetTodoByIdNotFound() {
        // Configure the service to return null when requesting a todo with ID 2
        when(todoService.getTodoById(2L)).thenReturn(null);

        // Make the request to the controller
        ResponseEntity<Todo> response = todoController.getTodoById(2L);

        // Verify that a 404 (not found) response is returned.
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test
    public void testSaveTodo() {
        Todo newTodo = new Todo();
        newTodo.setTitle("Comprar leche");

        when(todoService.saveTodo(any(Todo.class))).thenReturn(newTodo);

        ResponseEntity<Long> response = todoController.saveTodo(newTodo);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(newTodo.getId(), response.getBody());
    }

}

