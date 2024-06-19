package ru.project.fitstyle.service.impl;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.project.fitstyle.config.properties.PasswordRecoveryProperties;
import ru.project.fitstyle.model.entity.user.FitUser;
import ru.project.fitstyle.model.entity.user.PasswordRecovery;
import ru.project.fitstyle.model.repository.FitUserRepository;
import ru.project.fitstyle.model.repository.PasswordRecoveryRepository;
import ru.project.fitstyle.service.PasswordRecoveryService;
import ru.project.fitstyle.service.exception.recovery.RecoveryCodeExpiredException;
import ru.project.fitstyle.service.exception.recovery.UnableToSendEmailException;
import ru.project.fitstyle.service.exception.recovery.WrongCodeException;
import ru.project.fitstyle.service.exception.user.UserNotFoundException;

@Service
public class FitPasswordRecoveryService implements PasswordRecoveryService {

    private final JavaMailSender emailSender;
    private final PasswordRecoveryRepository passwordRecoveryRepository;
    private final FitUserRepository fitUserRepository;
    private final Long passwordRecoverTime;

    @Autowired
    public FitPasswordRecoveryService(JavaMailSender emailSender,
                                      PasswordRecoveryRepository passwordRecoveryRepository,
                                      FitUserRepository fitUserRepository,
                                      PasswordRecoveryProperties passwordRecoveryProperties) {
        this.emailSender = emailSender;
        this.passwordRecoveryRepository = passwordRecoveryRepository;
        this.fitUserRepository = fitUserRepository;
        this.passwordRecoverTime = passwordRecoveryProperties.getDeadlineMs();
    }

    @Override
    public void sendEmail(String toAddress) {
        if(fitUserRepository.existsByEmail(toAddress)) {
            passwordRecoveryRepository.deleteByEmail(toAddress);

            String randomCode = UUID.randomUUID().toString();
            PasswordRecovery passwordRecovery = new PasswordRecovery(toAddress, randomCode, new Date(new Date().getTime() + passwordRecoverTime));
            passwordRecoveryRepository.save(passwordRecovery);
            try {
                SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
                simpleMailMessage.setTo(toAddress);
                simpleMailMessage.setSubject("On-board 비밀번호 변경");
                simpleMailMessage.setText("안녕하세요. 비밀번호를 변경하는 코드는 다음과 같습니다. " + randomCode);
                emailSender.send(simpleMailMessage);
            } catch (MailException ex) {
                throw new UnableToSendEmailException("Unable to send message to the given address " + toAddress);
            }
        }
        else {
            throw new UserNotFoundException("User with that email cannot be found!");
        }
    }

    @Transactional
    @Override
    public void confirmRecovery(String code, String password) {
        PasswordRecovery passwordRecovery = passwordRecoveryRepository.findByCode(code)
                .orElseThrow(() -> new WrongCodeException("Provided code cannot be found in database!"));

        if(passwordRecovery.getDeadline().toInstant().compareTo(Instant.now()) >= 0) {
            FitUser fitUser = fitUserRepository.findByEmail(passwordRecovery.getEmail())
                    .orElseThrow(() -> new UserNotFoundException("User for given code is not in database!"));
            fitUser.setPassword(password);
            fitUserRepository.save(fitUser);
            passwordRecoveryRepository.delete(passwordRecovery);
        }
        else {
            passwordRecoveryRepository.delete(passwordRecovery);
            throw new RecoveryCodeExpiredException("Recovery code has been expired!");
        }
    }
}
