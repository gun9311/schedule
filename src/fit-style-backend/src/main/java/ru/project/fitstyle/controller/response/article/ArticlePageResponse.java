package ru.project.fitstyle.controller.response.article;

import java.util.List;

import ru.project.fitstyle.model.dto.article.ArticleDto;

public class ArticlePageResponse {
     private final List<ArticleDto> article;

    public ArticlePageResponse(List<ArticleDto> article) {
        this.article = article;
    }

    public List<ArticleDto> getArticle() {
        return article;
    }

}
