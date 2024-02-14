import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'posts-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  showComments: { [postId: string]: boolean } = {};
  commentForms: { [postId: string]: FormGroup } = {};
  private postsSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.posts.forEach((post) => {
      this.showComments[post._id] = false;
    });
  }

  ngOnInit() {
    this.postService.getPosts().subscribe();
    this.postsSubscription = this.postService
      .getPostsSubject()
      .subscribe((posts) => {
        this.posts = posts;
        this.posts.forEach((post) => {
          this.commentForms[post._id] = this.fb.nonNullable.group({
            comment: ['', Validators.required],
          });
        });
      });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  //Comments

  toggleComments(postId: string) {
    this.showComments[postId] = !this.showComments[postId];
  }

  onSubmitComment(event: Event, postId: string) {
    event.preventDefault();
    const { comment } = this.commentForms[postId].getRawValue();

    this.postService.postComment(comment, postId).subscribe({
      next: (res) => {
        this.commentForms[postId].reset();
        this.postService.getPosts().subscribe();
      },
      error: (err) => {
        console.error('Error submitting comment:', err);
      },
    });
  }
}
