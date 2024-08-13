package com.reddit.server.service;


import com.reddit.server.dto.PostRequest;
import com.reddit.server.dto.PostResponse;
import com.reddit.server.exceptions.PostNotFoundException;
import com.reddit.server.exceptions.SubredditNotFoundException;
import com.reddit.server.mapper.PostMapper;
import com.reddit.server.model.Post;
import com.reddit.server.model.Subreddit;
import com.reddit.server.model.User;
import com.reddit.server.repository.PostRepository;
import com.reddit.server.repository.SubredditRepository;

import com.reddit.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final SubredditRepository subredditRepository;
    private final AuthService authService;
    private final PostMapper postMapper;
    private final UserRepository userRepository;

    @Transactional
    public Long save(PostRequest postRequest) {
        Subreddit subreddit = subredditRepository.findByName(postRequest.getSubredditName())
                .orElseThrow(() -> new SubredditNotFoundException(postRequest.getSubredditName()));

        User currentUser = authService.getCurrentUser();

        Post post = postRepository.save(postMapper.map(postRequest,subreddit,currentUser));
        return post.getPostId();
    }

    @Transactional
    public PostResponse getPost(Long id){
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id.toString()));
        return postMapper.mapToDto(post);
    }

    @Transactional
    public List<PostResponse> getAllPosts(){
         return postRepository.findAll().stream().map(postMapper::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public List<PostResponse> getPostsBySubreddit(Long subredditId) {
        Subreddit subreddit = subredditRepository.findById(subredditId)
                .orElseThrow(() -> new SubredditNotFoundException(subredditId.toString()));
        List<Post> posts = postRepository.findAllBySubreddit(subreddit);
        return posts.stream().map(postMapper::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public List<PostResponse> getPostsByUsername(String username){
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        List<Post> posts = postRepository.findByUser(user);
        return posts.stream().map(postMapper::mapToDto).collect(Collectors.toList());
    }
}
