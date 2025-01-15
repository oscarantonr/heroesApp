import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Route, Router, UrlSegment } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PublicGuard {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    
        private checkAuthStatus(): boolean | Observable<boolean>{
            return this.authService.checkAuthentication()
            .pipe(
                tap(isAuthenticated => console.log('Authenticated Public:', isAuthenticated)),
                tap(isAuthenticated => {
                    if(isAuthenticated){
                        this.router.navigate(['./'])
                    }
                }),
                map(isAuthenticated => !isAuthenticated)
            )
        }

        canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
            return this.checkAuthStatus();
        }
        canActivate(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
            return this.checkAuthStatus();
        }

}