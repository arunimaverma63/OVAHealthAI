package com.example.OVAHealthAI.service;

import com.example.OVAHealthAI.entity.User;
import com.example.OVAHealthAI.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.OAuth2AuthorizationContext;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException{
        OAuth2User oAuth2User = super.loadUser(request);
        Map<String,Object> attrs = oAuth2User.getAttributes();

        String iden = (String) attrs.get("sub");
        String name = (String) attrs.get("name");
        String email = (String) attrs.get("email");


        if(email==null || email.isEmpty()){
            throw new OAuth2AuthenticationException("Email not found from Google");
        }

        User user = userRepo.findByEmail(email).orElse(new User());
        user.setUsername(name);   // setName → setUsername
        user.setEmail(email);
        user.setProvider("google");
        user.setProviderId(iden);
        userRepo.save(user);

        return new DefaultOAuth2User(
                List.of(new SimpleGrantedAuthority("ROLE_USER")), // hardcode for now
                attrs,
                "sub"
        );
    }
}
