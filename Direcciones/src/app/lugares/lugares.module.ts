import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LugaresPageRoutingModule } from './lugares-routing.module';

import { LugaresPage } from './lugares.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LugaresPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'
    })
  ],
  declarations: [LugaresPage]
})
export class LugaresPageModule {}
