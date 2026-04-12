import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Booksapi } from '../booksapi';

@Component({
  selector: 'app-favourites',
  imports: [],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {

 bookService = inject(Booksapi);

  constructor() {
    this.bookService.getFavourites();
  }

  deleteBook(id: string) {
    this.bookService.deleteItem(id);
  }

}
