import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  imageSrc: string = '';
  posts: Post[] = [];
  private postsSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe();
    this.postsSubscription = this.postService
      .getPostsSubject()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  form = this.fb.nonNullable.group({
    image: [''],
    description: ['', [Validators.required]],
  });

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.imageSrc = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const { description } = this.form.getRawValue();

    this.postService.postPost(this.imageSrc, description).subscribe({
      next: (res) => {
        this.form.reset();
        this.postService.getPosts().subscribe();
      },
      error: (err) => {
        console.error('Error submitting post:', err);
      },
    });
  }
}
