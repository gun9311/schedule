package ru.project.fitstyle.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "url")
public class CrawlerProperties {
    
    private String surfingUrl;
    private String snowboardingUrl;
    private String skateboardingUrl;

}
