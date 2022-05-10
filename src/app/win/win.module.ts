import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WinPageRoutingModule } from './win-routing.module';

import { WinPage } from './win.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WinPageRoutingModule
  ],
  declarations: [WinPage]
})
export class WinPageModule {}
