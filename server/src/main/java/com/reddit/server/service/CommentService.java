package com.reddit.server.service;

import com.reddit.server.dto.CommentsDto;
import com.reddit.server.exceptions.PostNotFoundException;
import com.reddit.server.mapper.CommentMapper;
import com.reddit.server.model.Comment;
import com.reddit.server.model.NotificationEmail;
import com.reddit.server.model.Post;
import com.reddit.server.model.User;
import com.reddit.server.repository.CommentRepository;
import com.reddit.server.repository.PostRepository;
import com.reddit.server.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentService {
    private static final String POST_URL = "";
    private final PostRepository postRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final CommentRepository commentRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;
    private final UserRepository userRepository;

    public void save(CommentsDto commentsDto){
        Post post = postRepository.findById(commentsDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException(commentsDto.getPostId().toString()));

        Comment comment = commentMapper.map(commentsDto, post, authService.getCurrentUser());
        commentRepository.save(comment);

        String message = mailContentBuilder
                .build(post.getUser().getUsername() + " posted a comment on your post." + POST_URL);

        sendCommentNotification(message, post.getUser());
    }

    private void sendCommentNotification(String message, User user){
        mailService.sendMail(
                new NotificationEmail(user.getUsername() + " commented on your post", user.getEmail(), message));
    }

    public List<CommentsDto> getAllCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId.toString()));
        List<Comment> comments= commentRepository.findByPost(post);
        return comments.stream().map(commentMapper::mapToDto).collect(Collectors.toList());
    }

    public List<CommentsDto> getAllCommentsForUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        List<Comment> comments = commentRepository.findAllByUser(user);
        return comments.stream().map(commentMapper::mapToDto).collect(Collectors.toList());
    }
}
