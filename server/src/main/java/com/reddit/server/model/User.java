package com.reddit.server.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String password;
    private String email;
    private Instant created;
    private boolean enabled;
}
