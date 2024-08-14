package com.reddit.server.controller;

import com.reddit.server.dto.VoteDto;
import com.reddit.server.service.VoteServices;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/votes/")
public class VoteController {
    private final VoteServices voteServices;

    @PostMapping
    public ResponseEntity<Void> vote(@RequestBody VoteDto voteDto){
        voteServices.vote(voteDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
