import { Component } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts: Array<PostModel> = [];

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;
  upvoteColor = 'green';
  downvoteColor = 'red'

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });
  }

  upvotePost(){}
  downvotePost(){}
  goToPost(id: number){}

  ngOnInit(): void {
  }
}
