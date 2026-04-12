import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Favourites } from './favourites/favourites';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'favourites', component: Favourites },
  { path: 'about', component: About },
];