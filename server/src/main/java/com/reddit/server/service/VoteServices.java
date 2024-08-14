package com.reddit.server.service;

import com.reddit.server.dto.VoteDto;
import com.reddit.server.exceptions.PostNotFoundException;
import com.reddit.server.exceptions.SpringRedditException;
import com.reddit.server.model.Post;
import com.reddit.server.model.Vote;
import com.reddit.server.repository.PostRepository;
import com.reddit.server.repository.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.reddit.server.model.VoteType.UPVOTE;

@Service
@AllArgsConstructor
public class VoteServices {
    private final VoteRepository voteRepository;
    private final AuthService authService;
    private final PostRepository postRepository;

    public void vote(VoteDto voteDto) {
        Post post = postRepository.findById(voteDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post not found with Id " + voteDto.getPostId()));


        Optional<Vote> voteByPostAndUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, authService.getCurrentUser());

        if (voteByPostAndUser.isPresent() && voteByPostAndUser.get().getVoteType().equals(voteDto.getVoteType())) {
            throw new SpringRedditException("You have already " + voteDto.getVoteType() + "'d for this post");
        }
        if (UPVOTE.equals(voteDto.getVoteType())) {
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            post.setVoteCount(post.getVoteCount() - 1);
        }
        voteRepository.save(mapToVote(voteDto, post));
        postRepository.save(post);
    }

    private Vote mapToVote(VoteDto voteDto, Post post) {
        return Vote.builder()
                .voteType(voteDto.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }
}
