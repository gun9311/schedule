package ru.project.fitstyle.model.entity.schedule;

import java.util.Date;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.user.FitUser;

@Getter
@Setter
@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "location", nullable=false)
    private String location;

    @Column(name = "description", nullable=false)
    private String description;

    @Column(name = "start_time", nullable=false)
    private Date startTime;

    @Column(name = "end_time", nullable=false)
    private Date endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fit_user_id", referencedColumnName = "id")
    private FitUser fitUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_training_id", referencedColumnName = "id")
    private GroupTraining groupTraining;

    public Schedule(String location, String description, Date startTime, Date endTime, FitUser fitUser, GroupTraining groupTraining) {
        this.location = location;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.fitUser = fitUser;
        this.groupTraining = groupTraining;

    }

    public Schedule() {

    }

}
