package ru.project.fitstyle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.project.fitstyle.model.entity.user.FirebaseToken;

@Repository
public interface FirebaseRepository extends JpaRepository<FirebaseToken, Long>{
    
}
