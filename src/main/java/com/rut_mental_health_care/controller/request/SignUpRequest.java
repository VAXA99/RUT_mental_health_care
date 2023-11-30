package com.rut_mental_health_care.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
        private String username;
        private String email;
        private String password;
        private String roles;
        private String name;
        private String surname;
}
