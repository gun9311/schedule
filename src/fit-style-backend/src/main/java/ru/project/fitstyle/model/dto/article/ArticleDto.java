package ru.project.fitstyle.model.dto.article;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ArticleDto {

    private final Long id;

    private final String title;

    private final String content;

    private final Date time;

    private final String imgUrl;

    private final String href;

    private final String source;

    private final String type;
}
