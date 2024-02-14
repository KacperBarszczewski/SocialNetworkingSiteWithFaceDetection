import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { CreatePostFormComponent } from '../../components/create-post-form/create-post-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CreatePostFormComponent, PostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
