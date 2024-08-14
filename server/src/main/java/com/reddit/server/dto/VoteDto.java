package com.reddit.server.dto;

import com.reddit.server.model.VoteType;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoteDto {
    private VoteType voteType;
    private Long postId;
}
