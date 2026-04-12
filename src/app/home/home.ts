import { Component, inject } from '@angular/core';
import { Booksapi } from '../booksapi';
import { Search } from '../search/search';

@Component({
  selector: 'app-home',
  imports: [Search],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  bookService = inject(Booksapi);
}