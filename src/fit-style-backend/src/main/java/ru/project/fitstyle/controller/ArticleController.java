package ru.project.fitstyle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.controller.response.article.ArticlePageResponse;
import ru.project.fitstyle.service.ArticleService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/article")
@PreAuthorize("hasRole('USER') || hasRole('MODERATOR') || hasRole('COACH')")
public class ArticleController {
    private final ArticleService articleService;

    @Autowired
    public ArticleController(final ArticleService articleService) {
        this.articleService = articleService;
    }

    /**
     * Show news by page number
     * */
    @GetMapping("/{page_number}")
    public ResponseEntity<ArticlePageResponse> showPage(@PathVariable("page_number") final int pageNumber) {
        //Here we get first 6 (can be specified) recently added news
        return ResponseEntity.ok(new ArticlePageResponse(articleService.getArticlePage(pageNumber)));
    }


    /**
     * Delete news
     * */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<SuccessMessage> delete(@PathVariable("id") final Long id) {
        //Delete news
        articleService.delete(articleService.getArticleById(id));
        return ResponseEntity.ok(
                new SuccessMessage("Success! Article deleted!")
        );
    }
}