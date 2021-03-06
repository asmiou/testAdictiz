import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdzHomeComponent } from './components/adz-home/adz-home.component';
import { AdzBooksService } from './services/adz-books.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AdzResultComponent, DialogContentComponent } from './components/adz-result/adz-result.component';
import { AdzHeaderComponent } from './components/adz-header/adz-header.component';
import { FilterPipe } from './pipes/filter.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatCardModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { ContentLoaderModule } from '@ngneat/content-loader';
import { ToastrModule } from 'ngx-toastr';


const appRoutes: Routes = [
  { path: 'home', component: AdzHomeComponent },
  { path: 'result/:s', component: AdzResultComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

const toastrConfig = {
  timeOut: 10000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
};

@NgModule({
  declarations: [
    AppComponent,
    AdzHomeComponent,
    AdzResultComponent,
    AdzHeaderComponent,
    FilterPipe,
    DialogContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    ContentLoaderModule,
    ToastrModule.forRoot(toastrConfig),
  ],
  providers: [
    AdzBooksService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogContentComponent],
})
export class AppModule { }
