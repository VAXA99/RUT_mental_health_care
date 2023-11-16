package com.rut_mental_health_care.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {
    private Long id;
    private UserDto userDto;
    private PostDto postDto;
    private Boolean isLike;
}
