import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  kanjis: any = {
    0: {
      'hanzi': null,
    }
  };

  findControl = new FormControl();
  error: boolean = false;
  noresult: boolean = false;
  loading: boolean = false;

  objApi = {
    'ion-sb-0': 'kanji-meanings',
    'ion-sb-1': 'kanji-readings',
    'ion-sb-2': 'kanji-readings',
    'ion-sb-3': 'chmn',
    'ion-sb-4': 'ids',
  };
  objField = {
    'ion-sb-0': 'meaning',
    'ion-sb-1': 'reading',
    'ion-sb-2': 'reading',
    'ion-sb-3': 'hanzi',
    'ion-sb-4': 'ids',
  };
  objField2 = {
    'ion-sb-0': 'language=en',
    'ion-sb-1': 'type=ja_on',
    'ion-sb-2': 'type=ja_kun',
    'ion-sb-3': '',
    'ion-sb-4': '',
  };
  objJson = {
    'ion-sb-0': 'kanjiMeanings',
    'ion-sb-1': 'kanjiReadings',
    'ion-sb-2': 'kanjiReadings',
    'ion-sb-3': 'chmn',
    'ion-sb-4': 'ids',
  };
  api: string = this.objApi['ion-sb-0'];
  field: string = this.objField['ion-sb-0'];
  field2: string = this.objField2['ion-sb-0'];
  json: string = this.objJson['ion-sb-0'];
  params: string = this.field2 + "&" + this.field + "=";

  constructor(
    public apiService: ApiService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.findControl.valueChanges
      .subscribe(kanjis => {
        this.noresult = false;
        this.loading = true;
      });

    this.findControl.valueChanges
      .pipe(
        filter(value => value.length > 0),
        debounceTime(1000),
        switchMap(value =>
          this.apiService.getKanjis(this.api, this.params + value).pipe(
            catchError(err => {
              this.kanjis = null;
              this.error = true;
              this.loading = false;
              console.log('error');

              return EMPTY;
            })
          )
        )
      )
      .subscribe(kanjis => {
        this.noresult = false;
        this.loading = false;

        if (kanjis) {
          this.error = false;

          console.log(kanjis.result[this.json]);
          this.kanjis = kanjis.result[this.json];

          if (kanjis.result[this.json].length == 0) {
            this.noresult = true;
          } else if (kanjis.result[this.json][0].label === null)  {
            this.noresult = true;
          }
        } else {
          this.kanjis = null;
          this.error = true;

          return EMPTY;
        }
      });
  }

segmentChanged(segment: any): void {
    this.noresult = false;
    this.api = this.objApi[segment.detail.value];
    this.field = this.objField[segment.detail.value];
    this.field2 = this.objField2[segment.detail.value];
    this.json = this.objJson[segment.detail.value];
    this.params = this.field + "=";

    if (this.field2 != '') {
      this.params = this.field2 + "&" + this.field + "=";
    }

    if (this.findControl.value && this.findControl.value.length != 0) {
      this.findControl.setValue(this.findControl.value);
    }
  }
}
