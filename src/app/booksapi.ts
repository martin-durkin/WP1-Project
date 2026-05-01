import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './models/book';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Booksapi {
  private _apiUrl = environment.apiUrl;
  private _http = inject(HttpClient);

  items = signal<Book[]>([]);
  favourites = signal<Book[]>([]);

  getItems(title: string, page: number = 1) {
    const url = `${this._apiUrl}/search?title=${title}&page=${page}`;
    this._http.get<any>(url)
      .subscribe(data => {
        this.items.set(data);
      });
  }

  addItem(title: string, author_name: string[], first_publish_year: string, cover_i: string, key: string) {
    const url = this._apiUrl;
    let book = { title, author_name, first_publish_year, cover_i, key };
    this._http.post<Book[]>(url, book)
      .subscribe(() => {
        this.getFavourites();
      });
  }

  getFavourites() {
    const url = this._apiUrl;
    this._http.get<Book[]>(url)
      .subscribe(data => {
        this.favourites.set(data);
      });
  }

  deleteItem(myId: string) {
    const url = this._apiUrl + '/' + myId;
    this._http.delete(url)
      .subscribe(() => {
        this.getFavourites();
      });
  }
}