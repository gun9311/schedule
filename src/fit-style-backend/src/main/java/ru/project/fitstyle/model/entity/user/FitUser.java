package ru.project.fitstyle.model.entity.user;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.project.fitstyle.model.entity.training.GroupTraining;
import ru.project.fitstyle.model.entity.training.PersonalTraining;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="fit_user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        })
public class FitUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "email", length = 50,
            nullable = false, unique = true)
    private String email;

    @Column(name = "password", length = 120,
            nullable = false)
    private String password;

    @Column(name = "name", length = 20,
            nullable = false)
    private String name;

    @Column(name = "gender", length = 6,
            nullable = true)
    private String gender;

    @Column(name = "img_URL", length = 5000)
    private String imgURL;
    
    @Column(name = "phone_number", length = 100)
    private String phoneNumber;

    @Column(name = "is_enabled", nullable = false)
    private Boolean isEnabled;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "fit_user_roles",
            joinColumns = @JoinColumn(name = "fit_user_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false))
    private List<Role> roles = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "fit_user_group_training",
            joinColumns = @JoinColumn(name = "fit_user_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "group_training_id", referencedColumnName = "id", nullable = false))
    private List<GroupTraining> groupTrainings = new ArrayList<>();

    @OneToMany(mappedBy = "fitUser", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    private List<PersonalTraining> personalTrainings = new ArrayList<>();

    // @OneToOne(fetch = FetchType.LAZY, optional = false, cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    // @PrimaryKeyJoinColumn
    // private Subscription subscription;

    public FitUser(String name, String email, String password, String gender, String imgURL, String phoneNumber) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.imgURL = imgURL;
    this.phoneNumber = phoneNumber;
    this.isEnabled = true;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }
}
