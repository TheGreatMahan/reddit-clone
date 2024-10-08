package com.reddit.server.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SubredditDto {
    private Long id;
    private String name;
    private String description;
    private Integer postCount;
}
