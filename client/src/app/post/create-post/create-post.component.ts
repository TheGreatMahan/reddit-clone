import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { EditorModule } from "@tinymce/tinymce-angular";
import { CreatePostPayload } from '../create-post.payload';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubredditService } from '../../subreddit/subreddit.service';
import { Router, RouterModule } from '@angular/router';
import { SubredditModel } from '../../subreddit/subreddit-response';
import { PostService } from '../../shared/post.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [EditorModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  private subredditService: SubredditService = inject(SubredditService);
  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  
  subreddits: Array<SubredditModel> = [];

  postPayload: CreatePostPayload = {
    postName: '',
    url: '',
    description: '',
    subredditName: ''
  }

  createPostForm: FormGroup = new FormGroup({
    postName: new FormControl('', Validators.required),
    subredditName: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  
  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(
      {
        next: (data) => this.subreddits = data,
        error: (error) => throwError(() => new Error(error)),
      }
    );
  }


  createPost() {
    
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postPayload.url = this.createPostForm.get('url')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe(
      {
        error: (error) => throwError(() => new Error(error)),
        next: (data) => this.router.navigateByUrl('/')
      }
    );
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
