package ru.project.fitstyle.service;

import java.util.List;

import ru.project.fitstyle.model.dto.article.ArticleDto;
import ru.project.fitstyle.model.entity.aritcle.Article;

public interface ArticleService {

    
    List<ArticleDto> getArticlePage(final int number);

    Article getArticleById(final Long id);

    void save(final Article article);

    void delete(final Article article);

    boolean existsByTitleAndHref(String title, String href);

}
