package com.reddit.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Getter
@Setter
public class Subreddit {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    public Long id;
    public String name;
    public String description;
    @OneToMany(fetch = LAZY)
    public List<Post> posts;
    public Instant createdDate;
    @ManyToOne(fetch = LAZY)
    public User user;
}
