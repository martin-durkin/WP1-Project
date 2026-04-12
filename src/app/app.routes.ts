import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Favourites } from './favourites/favourites';
import { About } from './about/about';
import { Search } from './search/search';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search},
  { path: 'favourites', component: Favourites },
  { path: 'about', component: About },
];