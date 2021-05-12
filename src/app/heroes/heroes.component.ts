import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero?: Hero;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(heroName: string): void {
    heroName = heroName.trim();
    if(!heroName) { return; }
    this.heroService.addHero({name: heroName} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }
  deleteHero(heroId: number): void {
    this.heroService.deleteHero(heroId)
      .subscribe(_ => 
        this.heroes = this.heroes.filter(h => h.id != heroId)
      );
  }
}
