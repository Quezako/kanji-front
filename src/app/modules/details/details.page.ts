import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { ApiService } from '../../core/services/api.service';
import { Kanji } from '../../shared/models/kanji.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  kanji: any = {
    id: null, hanzi: '', meaning: '', mnemonics: '', simplified: '', alike: '', reference: '', mine: null, remnant: null
  };
  // kanji: Kanji = {
  //   result: {
  //     chmn: {
  //       id: null, hanzi: '', meaning: '', mnemonics: '', simplified: '', alike: '', reference: '', mine: null, remnant: null
  //     }
  //   }
  // };

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getKanji();
  }

  async getKanji() {
    if (this.route.snapshot.paramMap.get('id') == 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getKanji(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.kanji = res.result.chmn[0];
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }
}
