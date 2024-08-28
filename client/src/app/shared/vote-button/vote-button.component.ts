import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { VotePayload } from '../vote-payload';
import { VoteType } from '../vote-type';
import { VoteService } from '../vote.service';
import { AuthService } from '../../auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './vote-button.component.html',
  styleUrl: './vote-button.component.css',
})
export class VoteButtonComponent {
  @Input() post: PostModel = {
    id: 0,
    postName: '',
    url: '',
    description: '',
    voteCount: 0,
    userName: '',
    subredditName: '',
    commentCount: 0,
    duration: '',
    upVote: false,
    downVote: false,
  };

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;
  upvoteColor = 'green';
  downvoteColor = 'red';
  votePayload: VotePayload = {
    voteType: VoteType.DOWNVOTE,
    postId: 0,
  };

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe({
      next: () => this.updateVoteDetails(),
      error: (err) => {
        this.toastr.error(err.error.message);
        throwError(() => new Error(err));
      },
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe((post) => {
      this.post = post;
    });
  }
}
