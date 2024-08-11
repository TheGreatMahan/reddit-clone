package com.reddit.server.service;

import com.reddit.server.dto.SubredditDto;
import com.reddit.server.exceptions.SpringRedditException;
import com.reddit.server.mapper.SubredditMapper;
import com.reddit.server.model.Subreddit;
import com.reddit.server.repository.SubredditRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class SubredditService {
    private final SubredditRepository subredditRepository;
    private final SubredditMapper subredditMapper;

    @Transactional
    public SubredditDto save(SubredditDto subredditDto){
        Subreddit save = subredditRepository.save(subredditMapper.mapDtoToSubreddit(subredditDto));
        subredditDto.setId(save.getId());
        return subredditDto;
    }

    @Transactional
    public List<SubredditDto> getAll(){
        return subredditRepository.findAll().stream().map(subredditMapper::mapSubredditToDto).collect(Collectors.toList());
    }

    @Transactional
    public SubredditDto getSubreddit(Long id){
        Subreddit subreddit =  subredditRepository.findById(id).orElseThrow(() -> new SpringRedditException("No subreddit with this id found"));
        return subredditMapper.mapSubredditToDto(subreddit);
    }
}
