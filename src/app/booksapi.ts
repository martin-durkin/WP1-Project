import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root',
})
export class Booksapi {
  private _apiUrl = 'http://localhost:5050/books';
  private _http = inject(HttpClient);

  items = signal<Book[]>([]);
  favourites = signal<Book[]>([]);

  // search books from Open Library via Express
  getItems(title: string) {
    const url = `${this._apiUrl}/search?title=${title}`;
    this._http.get<any[]>(url)
      .subscribe(data => {
        this.items.set(data);
      });
  }

  // add one book to favourites
  addItem(title: string, author_name: string[], first_publish_year: string, cover_i: string, key: string) {
    const url = this._apiUrl;
    let book = { title, author_name, first_publish_year, cover_i, key };
    this._http.post<Book[]>(url, book)
      .subscribe(() => {
        this.getFavourites();
      });
  }

  // get all favourites from MongoDB
  getFavourites() {
    const url = 'http://localhost:5050/favourites';
    this._http.get<Book[]>(url)
      .subscribe(data => {
        this.favourites.set(data);
      });
  }

  // delete book by id
  deleteItem(myId: string) {
    const url = 'http://localhost:5050/favourites/' + myId;
    this._http.delete(url)
      .subscribe(() => {
        this.getFavourites();
      });
  }
}