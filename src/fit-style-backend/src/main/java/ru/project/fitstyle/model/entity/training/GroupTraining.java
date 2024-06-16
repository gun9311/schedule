package ru.project.fitstyle.model.entity.training;

import ru.project.fitstyle.model.entity.subscription.Subscription;
import ru.project.fitstyle.model.entity.user.FitUser;

import javax.persistence.*;
import java.util.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "group_training")
public class GroupTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "title",
            nullable = false, unique = true)
    private String title;
    
    @Column(name = "description",
            nullable = false)
    private String description;

    @Column(name = "start_date",
            nullable = false)
    private Date startDate;

    @Column(name = "coach_id",
    nullable = false)
    private Long coachId;
    
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "training_id", referencedColumnName = "id",
    nullable = false)
    private TrainingType trainingType;
    
    @ManyToMany(mappedBy = "groupTrainings",
    fetch = FetchType.LAZY)
    private List<FitUser> fitUsers = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10,
            nullable = false)
    private ETrainingStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "apply_status", length = 10,
            nullable = false)
    private ApplyTrainingStatus applyStatus;

    @OneToMany(mappedBy = "groupTraining", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    private List<Subscription> subscriptions = new ArrayList<>();

    public GroupTraining() {
    }
    
    public GroupTraining(String title, String description, Date startDate, Long coachId, TrainingType trainingType, ETrainingStatus status, ApplyTrainingStatus applyStatus) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.coachId = coachId;
        this.trainingType = trainingType;
        this.status = status;
        this.applyStatus = applyStatus;
    }

    public void addFitUser(FitUser fitUser) {
        this.fitUsers.add(fitUser);
        fitUser.getGroupTrainings().add(this);
    }
}