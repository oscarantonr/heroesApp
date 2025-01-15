import {
    catchError,
    map,
    Observable,
    of,
    tap
    } from 'rxjs';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    private baseUrl = environments.baseURL;
    private user?: User;

    constructor(private httpClient: HttpClient) { }
    
    get currentUser(): User|undefined {
        if(!this.user){
            return undefined;
        } else{
            return structuredClone(this.user);
        }
    }

    login(email: string, password: string): Observable<User>{
         return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
         .pipe(
            tap(user => { this.user = user}),
            tap(user => localStorage.setItem('token', 'fa4r13asd.d23ad')),            
         )
            
    }

    checkAuthentication():Observable<boolean>{
        if(!localStorage.getItem('token')){
            return of(false)
        }

        const token = localStorage.getItem('token');

        return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user => this.user = user),
            map(user => !!user),
            catchError(err => of(false))
        );
    }

    logout(){
        this.user = undefined;
        localStorage.clear();
    }
}