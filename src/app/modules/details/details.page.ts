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
  id = this.route.snapshot.paramMap.get('id');
  noresult: boolean = true;

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
    if (this.id == 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getKanji(this.id)
        .subscribe(res => {
          console.log(res);

          if (res.result.chmn[0].label === null) {
            this.noresult = true;
            this.kanjis = {};
          } else {
            this.noresult = false;

            res.result.chmn.forEach(kanji => {
              for (var field in kanji) {
                if (['mnemonics', 'alike', 'reference'].includes(field)) {
                  kanji[field] = kanji[field].replace(/; /g, ";<br>");
                  kanji[field] = kanji[field].replace(/<i>(.*?)<\/i>/g, "<span style='color: #f0808f;'>$1</span>");
                  kanji[field] = kanji[field].replace(/<a href=("|')\?d=(.*?)("|')>/gi, "<a href='http://nihongo.monash.edu/cgi-bin/wwwjdic?1MKDR$2'>");
                  kanji[field] = kanji[field].replace(/<(img|a c=".") (svg)=("|')(.*?)("|')>/gi, "<img src='assets/img/$4.$2' style='height: 16px;width:auto;display: inline;'>");
				          // Split the field in array for each kanji found in text.
				          // Then template will add a link to each kanji (unique caractere on 1 line).
                  kanji[field] = kanji[field].split(/(\p{Script=Hani})+/gu);
                }
              }
            });

            this.kanjis = res.result.chmn;
          }

          console.log(this.noresult);
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
