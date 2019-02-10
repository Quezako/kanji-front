import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { LoadingController } from '@ionic/angular';

import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY, empty } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { Kanji } from '../../shared/models/kanji.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  kanjis: Kanji[] = [];
  // Control to search for users
  findControl = new FormControl();
  // Error while searching
  error: boolean = false;
  empty: boolean = false;

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    console.log(this.findControl.value);
    this.getKanjis();
  }

  async getKanjis() {
    this.empty = false;

    this.findControl.valueChanges
      .pipe(
        // Filter if less than two characters are entered
        filter(value => value.length > 2),
        // Set the delay to one second
        debounceTime(1000),
        // Requesting user data
        switchMap(value =>
          this.api.getKanjis(value).pipe(
            // Error processing
            catchError(err => {
              this.kanjis = null;
              this.error = true;
              return EMPTY;
            })
          )
        )
      )
      // Get the data
      .subscribe(kanjis => {
        this.kanjis = kanjis.result.chmn;
        this.error = false;
        this.empty = false;

        if (kanjis.result.chmn.length == 0) {
          this.empty = true;
        }
      });
  }
}
