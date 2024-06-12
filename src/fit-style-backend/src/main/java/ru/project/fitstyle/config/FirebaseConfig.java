package ru.project.fitstyle.config;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import ru.project.fitstyle.config.properties.FirebaseProperties;

@Configuration
public class FirebaseConfig {

    @Autowired
    private FirebaseProperties firebaseProperties;

    @PostConstruct
    public void init() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) { // 이미 초기화된 인스턴스가 있는지 확인
            // InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");
                // new FileInputStream("src/main/resources/serviceAccountKey.json");
            
                // JSON 파일을 읽어옴
            Resource resource = new ClassPathResource("serviceAccountKey.json");
            InputStream serviceAccountStream = resource.getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode serviceAccountJson = (ObjectNode) mapper.readTree(serviceAccountStream);

            // private_key를 YAML 파일에서 읽어온 값으로 변경
            String privateKey = firebaseProperties.getPrivateKey().replace("\\n", "\n");
            serviceAccountJson.put("private_key", privateKey);

            // 변경된 JSON을 문자열로 변환
            String modifiedServiceAccount = mapper.writeValueAsString(serviceAccountJson);
            InputStream modifiedServiceAccountStream = new ByteArrayInputStream(modifiedServiceAccount.getBytes(StandardCharsets.UTF_8));
            FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(modifiedServiceAccountStream))
                .build();

            FirebaseApp.initializeApp(options);
        }
    }
}