package ru.project.fitstyle.model.entity.subscription;

import javax.persistence.*;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.user.FitUser;

@Entity
@Getter
@Setter
@Table(name = "subscription")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            nullable = false, updatable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fit_user_id", referencedColumnName = "id")
    private FitUser fitUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_training_id", referencedColumnName = "id")
    private GroupTraining groupTraining;

    public Subscription() {
    }

    public Subscription(FitUser fitUser, GroupTraining groupTraining) {
        this.fitUser = fitUser;
        this.groupTraining = groupTraining;
    }

}