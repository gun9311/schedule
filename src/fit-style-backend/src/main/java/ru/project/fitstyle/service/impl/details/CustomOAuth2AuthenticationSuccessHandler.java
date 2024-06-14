package ru.project.fitstyle.service.impl.details;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.service.UserService;
import ru.project.fitstyle.service.impl.token.AccessTokenService;
import ru.project.fitstyle.service.impl.token.RefreshTokenService;

@Slf4j
@Component
public class CustomOAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler{
    
    
    private final AccessTokenService accessTokenService;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    // private final OAuth2AuthorizedClientService authorizedClientService;

    public CustomOAuth2AuthenticationSuccessHandler(AccessTokenService accessTokenService, 
                                                    RefreshTokenService refreshTokenService,
                                                    UserService userService) {
        this.accessTokenService = accessTokenService;
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
        // this.authorizedClientService = authorizedClientService;
    }

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = token.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        
        log.info(email);

        FitUser user = userService.getUserByEmail(email);


        String accessToken = accessTokenService.generateTokenFromUsername(email);
        String refreshToken = refreshTokenService.generateTokenFromUsername(email);

        log.info(accessToken);
        log.info(refreshToken);
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .collect(Collectors.toList());

        // JSON 응답 생성
        // LoginResponse loginResponse = new LoginResponse(user.getId(), email, accessToken, roles);
        // String jsonResponse = new ObjectMapper().writeValueAsString(loginResponse);
        Cookie refreshTokenCookie = createRefreshTokenCookie(refreshToken);
        
        response.addCookie(refreshTokenCookie);
        // response.getWriter().write(jsonResponse);
        // 리디렉션
        // response.sendRedirect("http://localhost:3000/oauth2/redirect");
        // URL에 쿼리 매개변수로 데이터 추가
        Long id = user.getId();
        String redirectUrl = "http://gunryul.store/oauth/redirect"
                + "?accessToken=" + accessToken
                + "&id=" + id
                + "&email=" + email
                + "&roles=" + String.join(",", roles);

        // 리디렉션
        // response.setStatus(HttpServletResponse.SC_FOUND); // 302 리디렉션 상태 코드 설정
        response.sendRedirect(redirectUrl);
    }

    private Cookie createRefreshTokenCookie(String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
        refreshTokenCookie.setPath("/");
        return refreshTokenCookie;
    }

}
