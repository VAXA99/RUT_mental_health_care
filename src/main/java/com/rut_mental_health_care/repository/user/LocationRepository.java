package com.rut_mental_health_care.repository.user;

import com.rut_mental_health_care.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
