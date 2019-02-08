import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Kanji } from '../kanji';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  kanjis: Kanji[] = [];

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getKanjis();
  }

  async getKanjis() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getKanjis()
      .subscribe(res => {
        // this.kanjis = res;
        this.kanjis = res.result.chmn;
        console.log(this.kanjis);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
        });
  }
}
