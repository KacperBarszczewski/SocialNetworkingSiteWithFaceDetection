import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";
import { map } from "rxjs/internal/operators/map";
import { filter } from "rxjs/internal/operators/filter";

export const isLoggedIn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getCurrentUser().pipe(
    filter((userJWT) => userJWT !== undefined),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  )
}

export const shouldLogdIn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getCurrentUser().pipe(
    filter((userJWT) => userJWT !== undefined),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return router.createUrlTree(['/home']);
      } else {
        return true;
      }
    })
  )
}
