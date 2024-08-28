import { Component } from '@angular/core';
import { PostModel } from '../../shared/post-model';
import { CommentPayload } from '../../comment/comment.payload';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../shared/post.service';
import { CommentService } from '../../comment/comment.service';
import { PostTileComponent } from '../../shared/post-tile/post-tile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PostTileComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  name: string = "";
  posts: PostModel[] = [];
  comments: CommentPayload[] = [];
  postLength: number = 0;
  commentLength: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params['name'];

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }
}
