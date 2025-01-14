import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  standalone: false,
  
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;
  
  constructor(private herosService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
  }
  
  ngOnInit(): void{
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.herosService.getHeroById(id)),
    )
    .subscribe(hero =>{
        if(!hero){
          return this.router.navigate(['/heroes/list'])
        } else{
          this.hero = hero;
          console.log({hero})
          return
        }
      })
    
}
}
