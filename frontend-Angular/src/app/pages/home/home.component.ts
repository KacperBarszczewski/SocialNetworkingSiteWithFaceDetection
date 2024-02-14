import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../../components/posts/posts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    PostsComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  imageSrc: string = '';
  postError: string = '';

  constructor(private fb: FormBuilder, private postService: PostService) {}

  form = this.fb.nonNullable.group({
    image: [''],
    description: ['', [Validators.required]],
  });

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.postError = '';
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
        this.imageSrc = '';
        this.postError = '';
        this.postService.getPosts().subscribe();
      },
      error: (err) => {
        this.postError = err.error.message;
      },
    });
  }
}
