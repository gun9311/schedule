package ru.project.fitstyle.model.entity.aritcle;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            nullable = false, updatable = false, unique = true)
    private Long id;

    @Column(name = "title", length = 100,
            nullable = false)
    private String title;

    @Column(name = "content", length = 1500,
            nullable = false)
    private String content;

    //TODO Make another Timestamp for last news update??

    //TODO Make date with @CreatedDate annotation
    //@CreatedDate
    @Column(name = "time",
            nullable = false)
    private Date time;

    @Column(name = "href", length = 10000,
            nullable = false)
    private String href;

    @Column(name = "img_url", length = 10000,
            nullable = true)
    private String imgUrl;
    
    @Column(name = "source", length = 50,
            nullable = false)
    private String source;
    
    @Column(name = "type", length = 20,
            nullable = false)
    private String type;
}
