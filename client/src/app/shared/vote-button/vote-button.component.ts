import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';

@Component({
  selector: 'app-vote-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './vote-button.component.html',
  styleUrl: './vote-button.component.css'
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
    downVote: false
  };

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;
  upvoteColor = 'green';
  downvoteColor = 'red'

  upvotePost(){}
  downvotePost(){}
}
