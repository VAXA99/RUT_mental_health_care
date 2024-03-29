package com.rut_mental_health_care.service.user;

import com.rut_mental_health_care.model.File;
import com.rut_mental_health_care.model.PasswordResetToken;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.repository.PasswordResetTokenRepository;
import com.rut_mental_health_care.repository.UserRepository;
import com.rut_mental_health_care.security.UserDetailsImpl;
import com.rut_mental_health_care.service.file.FileService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Calendar;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userDetail = userRepository.findByUsername(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public void addUser(User user) throws IOException {
        user.setPassword(encoder.encode(user.getPassword()));

        File file = fileService.uploadDefaultProfilePicture();
        user.setProfilePicture(file);

        userRepository.save(user);
    }

    public Boolean existsUserByUsername(String username) {
        return userRepository.existsUserByUsername(username);
    }

    public Boolean existsUserByEmail(String email) {
        return userRepository.existsUserByEmail(email);
    }

    public Long findUserIdByUsername(String username) {
        return userRepository.findUserIdByUsername(username);
    }

    public String findUserRolesByUsername(String username) {
        return userRepository.findUserRolesByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

    public User findUserByPasswordResetToken( String token) {
        return userRepository.findUserByPasswordResetToken(token)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Transactional
    public void createPasswordResetTokenForUser(User user, String token) {
        deletePasswordResetToken(user);
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);
    }

    private boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }

    private boolean isPasswordChanged(User user, String newPassword) {
        // Compare the new password with the old hashed password
        return !encoder.matches(newPassword, user.getPassword());
    }

    private void deletePasswordResetToken(User user) {
        passwordResetTokenRepository.deleteByUser(user);
    }

    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordResetTokenRepository.findByToken(token);

        if (!isTokenFound(passToken)) {
            passwordResetTokenRepository.deleteByToken(token);
            return "invalidToken";
        }
        else if (isTokenExpired(passToken)) {
            passwordResetTokenRepository.deleteByToken(token);
            return "expired";
        }
        else {
            return null;
        }
    }


    @Transactional
    public boolean changeUserPassword(User user, String password) {
        if (isPasswordChanged(user, password)) {
            user.setPassword(encoder.encode(password));
            userRepository.save(user);
            deletePasswordResetToken(user);
            return true;
        }
        return false;
    }



}
