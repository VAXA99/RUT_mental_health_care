package com.rut_mental_health_care.controller;

import com.rut_mental_health_care.dto.PasswordDto;
import com.rut_mental_health_care.model.User;
import com.rut_mental_health_care.security.JwtService;
import com.rut_mental_health_care.security.request.AuthRequest;
import com.rut_mental_health_care.security.request.SignUpRequest;
import com.rut_mental_health_care.service.mail.MailService;
import com.rut_mental_health_care.service.user.UserDetailsServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000/")
public class AuthController {

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final MailService mailService;

    @Autowired
    public AuthController(UserDetailsServiceImpl userDetailsService,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager,
                          MailService mailService) {
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.mailService = mailService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setRoles("ROLE_USER");
        user.setName(signUpRequest.getName());
        user.setSurname(signUpRequest.getSurname());


        userDetailsService.addUser(user);

        return ResponseEntity.ok("Success, User Signed Up Successfully");
    }

    @GetMapping("/exists_by_username")
    public ResponseEntity<?> exists_by_username (String username) {
        boolean userExists = userDetailsService.existsUserByUsername(username);
        if (userExists) {
            return ResponseEntity.badRequest().body("User with username " + username + " already exists.");
        } else {
            return ResponseEntity.ok("User with username " + username + " does not exists");
        }
    }

    @GetMapping("/exists_by_email")
    public ResponseEntity<?> exists_by_email (String email) {
        boolean userExists = userDetailsService.existsUserByEmail(email);
        if (userExists) {
            return ResponseEntity.badRequest().body("User with email " + email + " already exists.");
        } else {
            return ResponseEntity.ok("User with email " + email + " does not exists");
        }
    }

    @PostMapping("/signIn")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

    @PostMapping("/user/resetPassword")
    public ResponseEntity<?> resetPassword(HttpServletRequest request,
                                           @RequestParam String email) throws MessagingException {
        User user = userDetailsService.findByEmail(email);
        String token = UUID.randomUUID().toString();
        userDetailsService.createPasswordResetTokenForUser(user, token);
        mailService.send(mailService.constructResetTokenEmail(getAppUrl(request), token, user));

        return ResponseEntity.ok("Link sent to email: " + email);
    }

    private String getAppUrl(HttpServletRequest request) {
        // Get the scheme (http or https)
        String scheme = request.getScheme();
        // Get the server name
        String serverName = request.getServerName();
        // Get the server port
        int serverPort = request.getServerPort();


        return scheme + "://" + serverName + ":" + serverPort;
    }

    @PostMapping("/user/savePassword")
    public ResponseEntity<?> savePassword(@RequestBody PasswordDto passwordDto) {

        String result = userDetailsService.validatePasswordResetToken(passwordDto.getToken());

        if (result != null) {
            return ResponseEntity.status(500).body("Not valid token");
        }

        User user = userDetailsService.findUserByPasswordResetToken(passwordDto.getToken());

        if (userDetailsService.changeUserPassword(user, passwordDto.getNewPassword())) {
            return ResponseEntity.ok("Password changed for user: " + user.getUsername());
        } else {
            return ResponseEntity.badRequest().body("Password not changed. New password is the same as the old one.");
        }

    }
}
