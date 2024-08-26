import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './create-subreddit.component.html',
  styleUrl: './create-subreddit.component.css'
})
export class CreateSubredditComponent {
  private router: Router = inject(Router);
  private subredditService: SubredditService = inject(SubredditService);

  createSubredditForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  subredditModel: SubredditModel = {
    name:'',
    description:''
  }

  discard(){
    this.router.navigateByUrl('/list-subreddits');
  }
  createSubreddit(){
    //@ts-ignore
    this.subredditModel.name = this.createSubredditForm.get('title').value;
    //@ts-ignore
    this.subredditModel.description = this.createSubredditForm.get('description').value;
    
    this.subredditService.createSubreddit(this.subredditModel).subscribe({
      error: (e) => throwError(() => new Error(e)),
      complete: () => {
        this.router.navigateByUrl('/list-subreddits');
      }
    })
  }
}
