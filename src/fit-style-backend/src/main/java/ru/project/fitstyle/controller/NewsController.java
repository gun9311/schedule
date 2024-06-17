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
import ru.project.fitstyle.controller.response.news.NewsPageResponse;
import ru.project.fitstyle.model.entity.news.News;
import ru.project.fitstyle.service.NewsService;
import ru.project.fitstyle.service.StorageService;

@CrossOrigin(origins = "https://gunryul.store", maxAge = 3600)
@RestController
@RequestMapping("/api/news")
@PreAuthorize("hasRole('USER') || hasRole('MODERATOR') || hasRole('COACH')")
public class NewsController {
    private final NewsService newsService;
    private final StorageService imageStorageService;

    @Autowired
    public NewsController(final NewsService newsService,
                          final StorageService imageStorageService) {
        this.newsService = newsService;
        this.imageStorageService = imageStorageService;
    }

    /**
     * Show news by page number
     * */
    @GetMapping("/{page_number}")
    public ResponseEntity<NewsPageResponse> showPage(@PathVariable("page_number") final int pageNumber) {
        //Here we get first 6 (can be specified) recently added news
        return ResponseEntity.ok(new NewsPageResponse(newsService.getNewsPage(pageNumber)));
    }


    /**
     * Add news
     * */
    @PostMapping()
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<SuccessMessage> add(@Valid @RequestPart final AddEditNewsRequest request,
                                              @RequestPart(value = "image", required = false) MultipartFile image) {
        
        String imageFile = image != null ? imageStorageService.store(image) : null;                                                
        newsService.save(new News(
                request.getHeader(),
                request.getContent(),
                request.getDateTime(),
                imageFile
                ));

        return ResponseEntity.ok(
                new SuccessMessage("Success! News created!")
        );
    }

    /**
     * Update news (Currently not used)
     * */
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<SuccessMessage> update(@Valid @RequestBody final AddEditNewsRequest addEditNewsRequest,
                                                 @PathVariable("id") final Long id) {
        News news = newsService.getNewsById(id);
        news.setHeader(addEditNewsRequest.getHeader());
        news.setContent(addEditNewsRequest.getContent());
        news.setDateTime(addEditNewsRequest.getDateTime());

        newsService.save(news);
        return ResponseEntity.ok(
                new SuccessMessage("Success! News updated!")
        );
    }

    /**
     * Delete news
     * */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MODERATOR')")
    public ResponseEntity<SuccessMessage> delete(@PathVariable("id") final Long id) {
        //Delete news
        newsService.delete(newsService.getNewsById(id));
        return ResponseEntity.ok(
                new SuccessMessage("Success! News deleted!")
        );
    }
}
