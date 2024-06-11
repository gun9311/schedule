package ru.project.fitstyle.service.impl.details;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.model.entity.user.Role;
import ru.project.fitstyle.model.repository.FitUserRepository;
import ru.project.fitstyle.model.repository.RoleRepository;
import ru.project.fitstyle.service.exception.role.RoleNotFoundException;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final FitUserRepository fitUserRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public CustomOAuth2UserService(FitUserRepository fitUserRepository, RoleRepository roleRepository) {
        this.fitUserRepository = fitUserRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        String email = oauth2User.getAttribute("email");

        FitUser user = fitUserRepository.findByEmail(email).orElseGet(() -> {
            FitUser newUser = new FitUser();
            newUser.setEmail(email);
            newUser.setName(oauth2User.getAttribute("name"));
            newUser.setImgURL(oauth2User.getAttribute("picture"));
            newUser.setPassword("oauth default password");
            newUser.setEnabled(true);
            List<Role> roles = new ArrayList<>();
            Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RoleNotFoundException("Role cannot be found!"));
            roles.add(userRole);
            newUser.setRoles(roles);
            // 필요한 필드 초기화
            return fitUserRepository.save(newUser);
        });

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                oauth2User.getAttributes(), "email");
    }
}