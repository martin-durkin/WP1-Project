import { Component, inject } from '@angular/core';
import { Booksapi } from '../booksapi';
import { Book } from '../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  bookService = inject(Booksapi);
  searchTitle = '';

  searchBooks() {
    if (this.searchTitle.trim()) {
      this.bookService.getItems(this.searchTitle);
    }
  }

  addToFavourites(book: Book) {
    this.bookService.addItem(
      book.title,
      book.author_name,
      book.first_publish_year,
      book.cover_i,
      book.key
    );
  }
}