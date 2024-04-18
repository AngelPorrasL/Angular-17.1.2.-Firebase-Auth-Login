import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogicComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokedexdetailComponent } from './pokedexdetail/pokedexdetail.component';
import { GamesComponent } from './games/games.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LogicComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'pokedex',
    component: PokedexComponent,
  },
  {
    path: 'pokedex/:id',
    component: PokedexdetailComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
];