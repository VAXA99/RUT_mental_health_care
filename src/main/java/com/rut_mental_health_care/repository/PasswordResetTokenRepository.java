package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.PasswordResetToken;
import com.rut_mental_health_care.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    void deleteByUser(User user);
    void deleteByToken(String token);
}
