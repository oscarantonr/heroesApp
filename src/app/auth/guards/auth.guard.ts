import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanMatch,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment
    } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{



    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean>{
        return this.authService.checkAuthentication()
        .pipe(
            tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
            tap(isAuthenticated => {
                if(!isAuthenticated){
                    this.router.navigate(['./auth/login'])
                }
            }),
        )
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
        // console.log('Can match')
        // console.log({route, segments})

        // return false;
        return this.checkAuthStatus();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean | Observable<boolean> {
        // console.log('Can activate')
        // console.log({route, state})
        // return false;
        return this.checkAuthStatus();
    }
    
}