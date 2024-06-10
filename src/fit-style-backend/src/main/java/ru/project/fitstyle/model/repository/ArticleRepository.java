package ru.project.fitstyle.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ru.project.fitstyle.model.dto.article.ArticleDto;
import ru.project.fitstyle.model.entity.aritcle.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("select new ru.project.fitstyle.model.dto.article.ArticleDto(v.id, v.title, v.content, v.time, v.imgUrl, v.href, v.source, v.type) " +
            "from Article v")
    Optional<List<ArticleDto>> findArticlePage(final Pageable page);
}


