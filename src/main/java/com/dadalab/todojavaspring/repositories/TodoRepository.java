package com.dadalab.todojavaspring.repositories;

import com.dadalab.todojavaspring.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long userId);

    List<Todo> findByTitleContainingAndUserUsernameContaining(String title, String username);
}
