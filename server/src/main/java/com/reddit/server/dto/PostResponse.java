package com.reddit.server.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PostResponse {
    private Long id;
    private String postName;
    private String description;
    private String url;
    private String subredditName;
    private String userName;
    private Integer voteCount;
    private Integer commentCount;
    private String duration;
}
