import {
    catchError,
    map,
    Observable,
    of
    } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Hero } from '../interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeroesService {

    private baseUrl: string = environments.baseURL;

    constructor(private httpClient: HttpClient) { }


    getHeroes(): Observable<Hero[]> {
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroById(id:string): Observable<Hero | undefined>{
        return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError( error => of(undefined) )
        )
    }

    getSuggestions(query: string): Observable<Hero[]> {
        return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`)
            .pipe(
                map((heroes: Hero[]) => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase())).slice(0, 6))
            );
    }

    addHero(hero: Hero): Observable<Hero>{
        return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero)
    }

    updateHero(hero: Hero): Observable<Hero>{
        if(!hero.id){
            throw Error('Hero id is required');
        }else{
            return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
        }
    }

    deleteHeroById(id: string): Observable<boolean>{
        return this.httpClient.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            map(resp => true),
            catchError( err => of(false)),
        );
    }
}