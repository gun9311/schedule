package ru.project.fitstyle.model.entity.user;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "firebase_token")
public class FirebaseToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id",
            nullable = false, updatable = false, unique = true)
    private long id;

    @Column(name = "firebaseToken", length = 300,
            nullable = false, updatable = false, unique = true)
    private String token;

    @ManyToOne
    @JoinColumn(name = "fit_user_id", referencedColumnName = "id",
            nullable = false, updatable = false, unique = true)
    private FitUser fitUser;

    public FirebaseToken(String token, FitUser fitUser) {
        this.token = token;
        this.fitUser = fitUser;
    }

}