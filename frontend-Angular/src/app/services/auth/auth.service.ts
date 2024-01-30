import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';
import { UserData } from '../../models/userData';
import { ApiAuthRes } from '../../models/apiAuthRes';
import { environment } from '../../../environments/environment';

const USER_JWT_KEY = 'JWT_TOKEN';
// const USER_DATA_KEY = 'USER_DATA';

export interface UserJWT {
  token: string;
  id: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userJWT: BehaviorSubject<UserJWT | null | undefined> =
    new BehaviorSubject<UserJWT | null | undefined>(undefined);

  // private userFullData: BehaviorSubject<UserData | null> =
  //   new BehaviorSubject<UserData | null>(null);

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  async loadUser() {
    const token = localStorage.getItem(USER_JWT_KEY);

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const userJWT: UserJWT = {
        token: token,
        id: decoded.sub!,
        exp: decoded.exp!,
      };

      this.userJWT.next(userJWT);

      this.checkTokenExpired();
    } else {
      this.userJWT.next(null);
  
    }
  }

  login(email: string, password: string) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http
      .post<ApiAuthRes>(`${environment.domain}auth/login`, formData)
      .pipe(
        map((res: ApiAuthRes) => {
          localStorage.setItem(USER_JWT_KEY, res.token);

          const decoded = jwtDecode<JwtPayload>(res.token);
          const userJWT: UserJWT = {
            token: res.token,
            id: decoded.sub!,
            exp: decoded.exp!,
          };

          this.userJWT.next(userJWT);

          return userJWT;
        })
      );
  }

  signOut() {
    localStorage.removeItem(USER_JWT_KEY);

    this.userJWT.next(null);
  }

  checkTokenExpired() {
    const expired = this.userJWT.getValue()?.exp || -1;

    if (Math.floor(new Date().getTime() / 1000) >= expired) {
      this.signOut();
    }
  }

  getCurrentUser() {
    return this.userJWT.asObservable();
  }

  getCurrentUserId() {
    return this.userJWT.getValue()?.id;
  }

  getFullCurrentUserData():UserData | null {
    const decoded = jwtDecode<UserData>(this.userJWT.getValue().token);

    return decoded;
  }
}
