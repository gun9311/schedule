package ru.project.fitstyle.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import ru.project.fitstyle.config.properties.CrawlerProperties;
import ru.project.fitstyle.model.entity.aritcle.Article;
import ru.project.fitstyle.service.ArticleService;
import ru.project.fitstyle.service.CrawlingService;

@Service
@Slf4j
public class FitCrawlingService implements CrawlingService {

    private WebDriver webDriver;
    private final ArticleService articleService;
    private final String surfingUrl;
    private final String snowboardingUrl;
    private final String skateboardingUrl;

    private static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    private static final String WEB_DRIVER_PATH = "src/main/resources/static/chromedriver_win32/chromedriver.exe";
    
    private static final String crawlTitleAddress = "#rso > div > div > div:nth-child(%d) > div > div > a > div > div.SoAPf > div.n0jPhd.ynAwRc.MBeuO.nDgy9d";
    private static final String crawlContentAddress = "#rso > div > div > div:nth-child(%d) > div > div > a > div > div.SoAPf > div.GI74Re.nDgy9d";
    private static final String crawlImgAddress = "#rso > div > div > div:nth-child(%d) > div > div > a > div > div.gpjNTe > div > div > img";
    private static final String crawlTimeAddress = "#rso > div > div > div:nth-child(%d) > div > div > a > div > div.SoAPf > div.OSrXXb.rbYSKb.LfVVr > span";
    private static final String crawlHrefAddress = "#rso > div > div > div:nth-child(%d) > div > div > a";
    private static final String crawlSourceAddress = "#rso > div > div > div:nth-child(%d) > div > div > a > div > div.SoAPf > div.MgUUmf.NUnG9d > span";

    public FitCrawlingService(ArticleService articleService, CrawlerProperties crawlerProperties) {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        // ChromeOptions options = new ChromeOptions();
        // options.addArguments("--start-maximized");
        // options.addArguments("--disable-popup-blocking");
        // options.addArguments("headless");
        // this.webDriver = new ChromeDriver(options);
        this.articleService = articleService;
        this.surfingUrl = crawlerProperties.getSurfingUrl();
        this.snowboardingUrl = crawlerProperties.getSnowboardingUrl();
        this.skateboardingUrl = crawlerProperties.getSkateboardingUrl();
    }

    @Override
    @Scheduled(cron = "00 40 01 * * ?")
    public List<Article> crawling() {
        List<Article> articles = new ArrayList<>();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--disable-popup-blocking");
        options.addArguments("headless");
        webDriver = new ChromeDriver(options);
        for (String url : new String[]{surfingUrl, snowboardingUrl, skateboardingUrl}) {
            try {
                log.info("페이지 접속: {}", url);
                webDriver.get(url);
                Thread.sleep(2000);  // 페이지 로딩 대기
                String type = url.contains(surfingUrl) ? "surfing" : url.contains(snowboardingUrl) ? "snowboarding" : "skateboarding";

                // List<WebElement> newsElements = webDriver.findElements(By.cssSelector(crawlTitleAddress));
                for (int i = 1; i < 10; i++) {
                    try{
                    String title = webDriver.findElement(By.cssSelector(String.format(crawlTitleAddress, i))).getText();
                    String content = webDriver.findElement(By.cssSelector(String.format(crawlContentAddress, i))).getText();
                    String img = webDriver.findElement(By.cssSelector(String.format(crawlImgAddress, i))).getAttribute("src");
                    String time = webDriver.findElement(By.cssSelector(String.format(crawlTimeAddress, i))).getText();
                    String href = webDriver.findElement(By.cssSelector(String.format(crawlHrefAddress, i))).getAttribute("href");
                    String source = webDriver.findElement(By.cssSelector(String.format(crawlSourceAddress, i))).getText();
                    // String type = url.contains("surfing") ? "surfing" : url.contains("snowboarding") ? "snowboarding" : "skateboarding";

                    Date absoluteDate = convertRelativeTimeToDate(time);

                    log.info("제목: {}", title);

                    // Article 객체 생성 및 저장
                    Article article = new Article();
                    article.setTitle(title);
                    article.setContent(content);
                    article.setImgUrl(img);
                    article.setHref(href);
                    article.setTime(absoluteDate);
                    article.setSource(source);
                    article.setType(type);

                      // 중복 기사 확인 및 저장
                    if (!articleService.existsByTitleAndHref(title, href)) {
                        articles.add(article);
                        articleService.save(article); // Article 엔터티 저장
                    }
                } catch (NoSuchElementException e) {
                    log.warn("요소를 찾을 수 없음: {}", e.getMessage());
                }
                }
            } catch (Exception e) {
                log.error("크롤링 중 오류 발생: {}", e.getMessage());
            } 
        }
        webDriver.quit();
        return articles;
    }
    // 상대적인 시간을 절대적인 시간으로 변환하는 메소드
    private Date convertRelativeTimeToDate(String relativeTime) {
        Calendar calendar = Calendar.getInstance();
        if (relativeTime.contains("초")) {
            int seconds = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.SECOND, -seconds);
        } else if (relativeTime.contains("분")) {
            int minutes = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.MINUTE, -minutes);
        } else if (relativeTime.contains("시간")) {
            int hours = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.HOUR, -hours);
        } else if (relativeTime.contains("일")) {
            int days = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.DAY_OF_MONTH, -days);
        } else if (relativeTime.contains("주")) {
            int weeks = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.WEEK_OF_YEAR, -weeks);
        } else if (relativeTime.contains("개월")) {
            int months = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.MONTH, -months);
        } else if (relativeTime.contains("년")) {
            int years = Integer.parseInt(relativeTime.replaceAll("\\D", ""));
            calendar.add(Calendar.YEAR, -years);
        } else {
            try {
                return new SimpleDateFormat("yyyy. M. d").parse(relativeTime);
            } catch (Exception e) {
                log.error("날짜 파싱 오류: {}", e.getMessage());
            }
        }
        return calendar.getTime();
    }
}
