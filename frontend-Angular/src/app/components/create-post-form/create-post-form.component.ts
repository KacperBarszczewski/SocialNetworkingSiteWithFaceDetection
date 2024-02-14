import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'home-create-post-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-post-form.component.html',
})
export class CreatePostFormComponent {
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
