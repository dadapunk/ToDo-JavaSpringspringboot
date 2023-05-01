package com.dadalab.todojavaspring.repositories;

import com.dadalab.todojavaspring.models.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long userId);

    Page<Todo> findByTitleContainingIgnoreCaseAndUserUsernameContainingIgnoreCase(
            String title, String username, Pageable pageable);

    Page<Todo> findByTitleContaining(String title, Pageable paging);

    Page<Todo> findByUserUsernameContaining(String username, Pageable paging);
}
