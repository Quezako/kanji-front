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
  kanjis: any = {
    'init': '0',
  };

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

          res.result.chmn.forEach(kanji => {
            kanji.mnemonics = kanji.mnemonics.replace(/<img (svg)=("|')(.*?)("|')>/gi, "<img src='assets/img/$3.$1' style='height: 16px;width:auto;display: inline;'>");
            kanji.mnemonics = kanji.mnemonics.replace(/; /g, ";<br>");
            kanji.mnemonics = kanji.mnemonics.replace(/<i>/g, "<i style='color: #f0808f;'>");

            kanji.mnemonics = kanji.mnemonics.split(/(\p{Script=Hani})+/gu);
            kanji.alike = kanji.alike.split(/(\p{Script=Hani})+/gu);
            kanji.reference = kanji.reference.split(/(\p{Script=Hani})+/gu);
          });

          this.kanjis = res.result.chmn;
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
