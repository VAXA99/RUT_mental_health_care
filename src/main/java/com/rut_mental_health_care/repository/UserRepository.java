package com.rut_mental_health_care.repository;

import com.rut_mental_health_care.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    @Query("SELECT prt.user FROM PasswordResetToken prt WHERE prt.token = :token")
    Optional<User> findUserByPasswordResetToken(@Param("token") String token);
    @Query("SELECT u.id FROM User u WHERE u.username = :username")
    Long findUserIdByUsername(@Param("username") String username);
    @Query("SELECT u.roles FROM User u WHERE u.username = :username")
    String findUserRolesByUsername(@Param("username") String username);
    List<User> findAllByRoles(String roles);
    Boolean existsUserByUsername(String username);
    Boolean existsUserByEmail(String email);
    @Query(nativeQuery = true,
            value = "SELECT FLOOR(EXTRACT(EPOCH FROM AGE(NOW(), :dateOfBirth)) / 31556952.0)")
    Integer countUserAge(@Param("dateOfBirth") Date dateOfBirth);
}
