import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsSubject = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  postPost(image: string, description: string) {
    const formData = {
      user_id: this.authService.getCurrentUserId(),
      description,
      image,
    };

    return this.http.post(`${environment.domain}post`, formData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.domain}post`).pipe(
      tap((posts) => {
        posts.reverse();
        this.postsSubject.next(posts);
      }),
      catchError((error) => {
        console.error('Error getPost:', error);
        return throwError(error);
      })
    );
  }

  getPostsSubject(): Observable<Post[]> {
    return this.postsSubject.asObservable();
  }

  postComment(text: string,post_id:string ) {
    const formData = {
      user_id: this.authService.getCurrentUserId(),
      text,
      post_id,
    };

    return this.http.post(`${environment.domain}comment`, formData);
  }
}
