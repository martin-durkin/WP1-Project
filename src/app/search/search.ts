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
  addedBooks = new Set<string>();
  searchError = '';
  hasSearched = false;

  constructor() {
    this.bookService.getFavourites();
  }

  currentPage = 1;
 searchBooks() {
  if (this.searchTitle.trim()) {
    this.searchError = '';
    this.hasSearched = true;
    this.currentPage = 1;
    this.bookService.getItems(this.searchTitle, this.currentPage);
  } else {
    this.searchError = 'Please enter a book title to search.';
  }
}

nextPage() {
  this.currentPage++;
  this.bookService.getItems(this.searchTitle, this.currentPage);
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.bookService.getItems(this.searchTitle, this.currentPage);
  }
}

  addToFavourites(book: Book) {
    const alreadySaved = this.bookService.favourites().some(f => f.key === book.key);
    if (!alreadySaved) {
      this.bookService.addItem(
        book.title,
        book.author_name,
        book.first_publish_year,
        book.cover_i,
        book.key
      );
    }
    this.addedBooks.add(book.key);
  }
}