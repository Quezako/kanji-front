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
      // this.statusBar.styleDefault();
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ffffff');
      // this.statusBar.styleLightContent();
      this.statusBar.styleBlackOpaque();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }
}
