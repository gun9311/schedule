package ru.project.fitstyle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ru.project.fitstyle.model.entity.user.FirebaseToken;

@Repository
public interface FirebaseRepository extends JpaRepository<FirebaseToken, Long>{


    @Query("select v.token from FirebaseToken v where v.fitUser.id = :id")
    String getTokenByUserId(@Param("id") final Long id);
}
