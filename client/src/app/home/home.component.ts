import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostTileComponent } from "../shared/post-tile/post-tile.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { SubredditSideBarComponent } from "../shared/subreddit-side-bar/subreddit-side-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PostTileComponent, SideBarComponent, SubredditSideBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngOnInit(): void {
  }
}
