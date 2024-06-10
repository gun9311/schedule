package ru.project.fitstyle.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ru.project.fitstyle.config.properties.ArticleProperties;
import ru.project.fitstyle.model.dto.article.ArticleDto;
import ru.project.fitstyle.model.entity.aritcle.Article;
import ru.project.fitstyle.model.repository.ArticleRepository;
import ru.project.fitstyle.service.ArticleService;
import ru.project.fitstyle.service.exception.news.NewsPageNotFoundException;
import ru.project.fitstyle.service.exception.news.NewsStoryNotFoundException;

@Service
public class FitArticleService implements ArticleService{
    private final ArticleRepository articleRepository;

    private final int pageNumber;

    @Autowired
    public FitArticleService(final ArticleRepository articleRepository, final ArticleProperties articleProperties) {
        this.articleRepository = articleRepository;
        this.pageNumber = articleProperties.getPageNumber();
    }

    @Override
    public List<ArticleDto> getNewsPage(final int number) {
        return articleRepository
                .findArticlePage(PageRequest.of(number - 1, pageNumber, Sort.by(Sort.Direction.DESC, "dateTime")))
                .filter(list -> list.size() != 0)
                .orElseThrow(() -> new NewsPageNotFoundException("There are no news on that page!"));
    }

    @Override
    public Article getArticleById(final Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() ->
                        new NewsStoryNotFoundException("News with that id cannot be found!"));
    }

    @Override
    public void save(final Article article) {
        articleRepository.save(article);
    }

    @Override
    public void delete(final Article article) {
        articleRepository.delete(article);
    }

    @Override
    public boolean existsByTitleAndHref(String title, String href) {
        return articleRepository.existsByTitleAndHref(title, href);
    }

}