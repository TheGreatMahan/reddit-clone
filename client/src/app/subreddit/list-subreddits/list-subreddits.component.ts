import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { SubredditModel } from '../subreddit-response';

@Component({
  selector: 'app-list-subreddits',
  standalone: true,
  imports: [CommonModule, RouterModule, SideBarComponent],
  templateUrl: './list-subreddits.component.html',
  styleUrl: './list-subreddits.component.css'
})
export class ListSubredditsComponent implements OnInit {
  
  subreddits: Array<SubredditModel> = [];

  constructor(private subredditService: SubredditService) { }

  ngOnInit() {
      this.subredditService.getAllSubreddits().subscribe({
        next: (data) =>  this.subreddits = data,
        error: (error) => throwError(() => new Error(error))
      });
  }
}
