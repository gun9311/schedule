package ru.project.fitstyle.model.entity.training;

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

    public GroupTraining() {
    }
    
    public GroupTraining(Date startDate, Long coachId, TrainingType trainingType, ETrainingStatus status, ApplyTrainingStatus applyStatus) {
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