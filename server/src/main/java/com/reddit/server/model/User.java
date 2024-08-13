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
    public Long userId;
    public String username;
    public String password;
    public String email;
    public Instant created;
    public boolean enabled;
}
