package com.reddit.server.mapper;

import com.reddit.server.dto.PostRequest;
import com.reddit.server.dto.PostResponse;
import com.reddit.server.model.Post;
import com.reddit.server.model.Subreddit;
import com.reddit.server.model.User;
import com.reddit.server.repository.CommentRepository;
import com.reddit.server.repository.VoteRepository;
import com.reddit.server.service.AuthService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.github.marlonlom.utilities.timeago.TimeAgo;

@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private AuthService authService;

    @Mapping(target = "createDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "description", source = "postRequest.description")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "subreddit", source = "subreddit")
    @Mapping(target = "voteCount", constant = "0")
    public abstract Post map(PostRequest postRequest, Subreddit subreddit, User user);

    @Mapping(target = "id", source = "postId")
    @Mapping(target = "subredditName", source = "subreddit.name")
    @Mapping(target = "userName", source = "user.username")
    @Mapping(target = "commentCount", expression = "java(commentCount(post))")
    @Mapping(target = "duration", expression = "java(getDuration(post))")
    public abstract PostResponse mapToDto(Post post);

    Integer commentCount(Post post){ return commentRepository.findByPost(post).size(); }

    String getDuration(Post post) { return TimeAgo.using(post.getCreateDate().toEpochMilli()); }
}
