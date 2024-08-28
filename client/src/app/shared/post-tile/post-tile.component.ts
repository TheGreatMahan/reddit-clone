import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VoteButtonComponent } from "../vote-button/vote-button.component";


@Component({
  selector: 'app-post-tile',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, VoteButtonComponent],
  templateUrl: './post-tile.component.html',
  styleUrl: './post-tile.component.css'
})
export class PostTileComponent {
  posts$: Array<PostModel> = [];
  faComments = faComments;
  goToPost(id: number){
    this.router.navigateByUrl('/view-post/' + id);
  }

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    });
  }
}
