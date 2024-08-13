package com.reddit.server.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PostRequest {
    private Long postId;
    private String postName;
    private String url;
    private String subredditName;
    private String description;
}
