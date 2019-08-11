import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Style: default.
      //this.statusBar.styleDefault();
      // Style: white on black.
      this.statusBar.styleBlackTranslucent();
      // this.statusBar.styleLightContent();
      //this.statusBar.styleBlackOpaque();

      // set status bar (background) to white
      //this.statusBar.backgroundColorByHexString('#ffffff');
      // let status bar overlay webview
      //this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }
}
