package ru.project.fitstyle.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ru.project.fitstyle.controller.request.news.AddEditNewsRequest;
import ru.project.fitstyle.controller.response.SuccessMessage;
import ru.project.fitstyle.controller.response.article.ArticlePageResponse;
import ru.project.fitstyle.controller.response.news.NewsPageResponse;
import ru.project.fitstyle.model.entity.news.News;
import ru.project.fitstyle.service.ArticleService;
import ru.project.fitstyle.service.NewsService;
import ru.project.fitstyle.service.StorageService;

@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
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