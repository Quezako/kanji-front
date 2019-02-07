import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { KanjiComponent } from './kanji/kanji.component';
import { KanjiAddComponent } from './kanji-add/kanji-add.component';
import { KanjiDetailComponent } from './kanji-detail/kanji-detail.component';
import { KanjiEditComponent } from './kanji-edit/kanji-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {
    path: 'kanjis',
    component: KanjiComponent,
    data: { title: 'Kanji List' }
  },
  {
    path: 'kanji-details/:id',
    component: KanjiDetailComponent,
    data: { title: 'Kanji Details' }
  },
  {
    path: 'kanji-add',
    component: KanjiAddComponent,
    data: { title: 'Kanji Add' }
  },
  {
    path: 'kanji-edit/:id',
    component: KanjiEditComponent,
    data: { title: 'Kanji Edit' }
  },
  { path: '',
    redirectTo: '/kanjis',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    KanjiComponent,
    KanjiAddComponent,
    KanjiDetailComponent,
    KanjiEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
