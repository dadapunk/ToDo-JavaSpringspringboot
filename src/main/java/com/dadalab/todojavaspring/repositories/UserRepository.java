package com.dadalab.todojavaspring.repositories;

import com.dadalab.todojavaspring.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
