package ru.project.fitstyle.service.impl.token;

import org.springframework.stereotype.Service;

import ru.project.fitstyle.model.entity.user.FirebaseToken;
import ru.project.fitstyle.model.repository.FirebaseRepository;

@Service
public class FirebaseTokenService {
    private final FirebaseRepository firebaseRepository;

    public FirebaseTokenService(final FirebaseRepository firebaseRepository){
        this.firebaseRepository = firebaseRepository;
    }


    public void saveToken(FirebaseToken firebaseToken){
        firebaseRepository.save(firebaseToken);
    }
}
