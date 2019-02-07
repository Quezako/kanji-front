import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Kanji } from '../kanji';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  kanji: Kanji = {
    id: null, hanzi: '', meaning: '', mnemonics: '', simplified: '', alike: '', reference: '', mine: null, remnant: null };

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router) { }

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
          this.kanji = res;
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

  // async delete(id) {
  //   const loading = await this.loadingController.create({
  //     message: 'Loading...'
  //   });
  //   await loading.present();
  //   await this.api.deleteProduct(id)
  //     .subscribe(res => {
  //       loading.dismiss();
  //       this.router.navigate(['/tabs', { outlets: { home: 'home' } }]);
  //     }, err => {
  //       console.log(err);
  //       loading.dismiss();
  //     });
  // }
}
