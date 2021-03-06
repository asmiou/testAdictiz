import { Injectable } from '@angular/core';
import AdzBook from '../models/Book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AdzQuery from '../models/Query.model';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdzBooksService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private cookieService: CookieService,
    private _snackBar: MatSnackBar) {
  }

  books: AdzBook[] = [];
  query: AdzQuery = new AdzQuery();


  booksSubject = new Subject<AdzBook[]>();

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  getBooks(request: string) {
    this.httpClient
      .get<any>(`https://www.googleapis.com/books/v1/volumes?q=${request}&langRestrict=${this.query.lang}&maxResults=${this.query.maxResults}`)
      .subscribe(
        (response) => {
          this.responseParser(response);
          this.queryParser(response, request);
          this.emitBooks();
        },
        (error) => {
          this.toastr.error('Nous ne parvenons pas à traiter votre requête, vérifier votre connexion internet', 'Erreur connexion');
        }
      );
  }

  queryParser(response: any, req: string) {
    this.query.request = req;
    this.query.totalItems = response.items.length;
  }

  responseParser(response: any) {
    const items: any[] = response.items;
    items.map(
      i => {
        let book: AdzBook = new AdzBook();
        book.authors = i.volumeInfo.authors;
        book.title = i.volumeInfo.title;
        book.publishedDate = i.volumeInfo.publishedDate ? new Date(i.volumeInfo.publishedDate) : Number.NaN;
        book.publisher = i.volumeInfo.publisher;
        book.description = i.volumeInfo.description;
        book.pageCount = i.volumeInfo.pageCount;
        book.categories = i.volumeInfo.categories;
        book.imageLink = (i.volumeInfo.imageLinks) ? i.volumeInfo.imageLinks.thumbnail : '/assets/book.png';
        book.language = i.volumeInfo.language;
        book.link = i.volumeInfo.canonicalVolumeLink;
        book.country = i.saleInfo.country;
        book.price = (i.saleInfo.listPrice) ? i.saleInfo.listPrice.amount : 0;
        book.currency = (i.saleInfo.listPrice) ? i.saleInfo.listPrice.currencyCode : '';
        book.isEbook = i.saleInfo.isEbook;

        this.books.push(book);
      }
    );
  }

  notifyUseCookie() {
    let agree: string = this.cookieService.check('agree') ? this.cookieService.get('agree') : 'false';
    if (agree !== new Boolean(true).toString()) {
      let snackBarRef = this._snackBar.open("Bienvenu à vous, Nous utilisons des cookies pour nous assurer du bon fonctionnement de notre site. Plus précisement la langue souhaité pour vos recherches de livres", 'OK', {
      });

      snackBarRef.onAction().subscribe(() => {
        this.cookieService.set('agree', new Boolean(true).toString())
      });
    }
  }
}
