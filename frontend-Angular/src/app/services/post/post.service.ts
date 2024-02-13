import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  postPost(image: string, description: string) {
    const formData = {
      user_id: this.authService.getCurrentUserId(),
      description,
      image,
    };

    return this.http.post(`${environment.domain}post`, formData);
  }

  getPosts(){
    this.http.get(`${environment.domain}post`)
  }
}
