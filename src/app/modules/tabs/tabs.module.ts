import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs.router.module';
import { TabsPage } from './tabs.page';
import { HomePageModule } from '../home/home.module';
import { DetailsPageModule } from '../details/details.module';
import { AboutPageModule } from '../about/about.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    DetailsPageModule,
    AboutPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
